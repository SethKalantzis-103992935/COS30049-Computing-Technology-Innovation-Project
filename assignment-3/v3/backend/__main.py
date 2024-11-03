from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import logging
import joblib
import pandas as pd

# Import the models
from _regressionmodel import LinearRegressionModel
from _clustermodel import KMeansModel
from _knnmodel import KNNModel

# Set up logging
logging.basicConfig(level=logging.INFO)

# Create the FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the models
regression_model = LinearRegressionModel()
kmeans_model = KMeansModel()
knn_model = KNNModel()

# Define the Expected Data Model for the API
class PollutantData(BaseModel):
    CO_ppm: float
    NO_pphm: float
    NO2_pphm: float
    OZONE_pphm: float
    PM10_ug_m3: float
    SO2_pphm: float
    label: str


# On startup, load the clustering model and KNN model
@app.on_event("startup")
async def load_model():
    try:
        kmeans_model.clustered_data = joblib.load('km_data.pkl')
        knn_model.scatterplot_data = joblib.load('knn_data.pkl')
    except Exception as e:
        print(f"Error loading the model: {e}")




# Get predictions from the K-Means model
@app.post("/cluster-model")
async def predict_pollutant_cluster(data: PollutantData):
    try:

        # Get the new values to predict
        new_data = np.array([[data.CO_ppm, data.NO_pphm, data.NO2_pphm, data.OZONE_pphm, 
                              data.PM10_ug_m3, data.SO2_pphm]])

        # Predict the cluster
        predicted_cluster = kmeans_model.predict(new_data)[0]

        # Get the statistics for the predicted cluster and label
        cluster_stats = kmeans_model.get_cluster_statistics(predicted_cluster, data.label)
        
        # Return the predicted cluster and label statistics
        return {
            "predicted_cluster": int(predicted_cluster),
            "cluster_stats": cluster_stats
        }
    except ValueError as e:
        # Raise an HTTP 400 Bad Request error if the model has not been trained
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Raise an HTTP 500 Internal Server Error if prediction fails
        raise HTTPException(status_code=500, detail=str(e))


# Get the clustered data from the K-Means model
@app.get("/cluster-model")
async def get_kmeans_data():
    # Check if the clustered data is available
    if kmeans_model.clustered_data is None:
        raise HTTPException(status_code=404, detail="Clustered data not available")
    return kmeans_model.clustered_data.to_dict(orient="records")




# Get predictions from the regression model
@app.post("/regression-model")
def predict_health_status(data: PollutantData):
    try:
        # Create a new DataFrame with the values to predict
        new_data = pd.DataFrame([[data.CO_ppm, data.NO_pphm, data.NO2_pphm, data.OZONE_pphm, 
                          data.PM10_ug_m3, data.SO2_pphm]], 
                        columns=['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm'])

        # Predict the health status
        prediction = regression_model.predict(new_data, data.label)

        # Return the prediction and the dependent variable
        return {
            "health_status": prediction.tolist(),
            "dependent_variable": data.label
        }
    
    except FileNotFoundError as e:
        # Raise an HTTP 404 Not Found error if model or scaler file is not found
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        # Raise an HTTP 500 Internal Server Error if prediction fails
        raise HTTPException(status_code=500, detail=str(e))
    



# Get predictions from the KNN model
@app.post("/knn-model")
async def predict_knn_risk(data: PollutantData):
    try:
        # Create a new DataFrame with the values to predict
        new_data = pd.DataFrame([[data.CO_ppm, data.NO_pphm, data.NO2_pphm, data.OZONE_pphm, 
                          data.PM10_ug_m3, data.SO2_pphm]], 
                        columns=['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm'])

        # Predict the health status and pollution score
        health_stat, pollution_score = knn_model.predict(new_data, data.label)
        
        # Flatten the arrays and convert to lists
        health_stat = health_stat.flatten().tolist()
        pollution_score = pollution_score.flatten().tolist()

        # Return the health status and pollution score
        return {
            "health_status": health_stat,
            "pollution_score": pollution_score
        }
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Get the scatterplot data from the KNN model
@app.get("/knn-model")
async def get_plot_data():
    # Check if the scatterplot data is available
    if knn_model.scatterplot_data is None:
        raise HTTPException(status_code=404, detail="KNN data not available")
    return knn_model.scatterplot_data.to_dict(orient="records")



# Run the uvircorn server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
