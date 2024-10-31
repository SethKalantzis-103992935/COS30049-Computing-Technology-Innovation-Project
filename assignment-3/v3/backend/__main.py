from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import logging
import joblib

from _regressionmodel import LinearRegressionModel
from _clustermodel import KMeansModel
from _knnmodel import KNNModel

logging.basicConfig(level=logging.INFO)

app = FastAPI()

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


# On startup, load the clustering model
@app.on_event("startup")
async def load_model():
    try:
        kmeans_model.clustered_data = joblib.load('km_data.pkl')
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
    if kmeans_model.clustered_data is None:
        raise HTTPException(status_code=404, detail="Clustered data not available")
    return kmeans_model.clustered_data.to_dict(orient="records")








# Get predictions from the regression model
@app.post("/regression-model")
def predict_health_status(data: PollutantData):
    try:
        # Get the new values to predict
        new_data = np.array([[data.CO_ppm, data.NO_pphm, data.NO2_pphm, data.OZONE_pphm, 
                              data.PM10_ug_m3, data.SO2_pphm]])

        prediction = regression_model.predict(new_data, data.label)

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
        new_data = np.array([[data.CO_ppm, data.NO_pphm, data.NO2_pphm, data.OZONE_pphm, 
                              data.PM10_ug_m3, data.SO2_pphm]])
        
        risk_level, health_stat_value = knn_model.predict(new_data, data.label)
        
        return {
            "risk_level": risk_level,
            "health_stat_value": health_stat_value
        }
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


DATA_PATH = "__data/annual.csv"
MODEL_CACHE = {}

# Get the scatter plot data for the KNN model
@app.get("/knn-model")
def get_plot_data(health_stat: str, pollutant: str):
    # Ensure the model for the requested health stat is built and cached
    if health_stat not in MODEL_CACHE:
        model_classifier, model_regressor, scaler, label_encoder = knn_model.build_knn_model(DATA_PATH, health_stat)
        MODEL_CACHE[health_stat] = (model_classifier, model_regressor, scaler, label_encoder)
    else:
        model_classifier, model_regressor, scaler, label_encoder = MODEL_CACHE[health_stat]

    df = pd.read_csv(DATA_PATH)
    x = df[health_stat].values.tolist()
    y = df[pollutant].values.tolist()
    
    # Predict risk levels for all data points
    pollutants_data = df[['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm']].values
    risk_levels = label_encoder.inverse_transform(
        model_classifier.predict(
            scaler.transform(pollutants_data)
        )
    ).tolist()
    
    # Map risk levels to numerical values
    risk_level_mapping = {
        "Low Risk": 0,
        "Low-Medium Risk": 1,
        "Medium Risk": 2,
        "Medium-High Risk": 3,
        "High Risk": 4
    }
    risk_levels_numeric = [risk_level_mapping[risk] for risk in risk_levels]
    
    plot_data = {
        "data": [
            {
                "x": x,
                "y": y,
                "mode": "markers",
                "marker": {
                    "color": risk_levels_numeric,
                    "colorscale": "Viridis",
                    "showscale": True
                }
            }
        ],
        "layout": {
            "title": f"KNN Decision Boundary for {health_stat} vs {pollutant}",
            "xaxis": {"title": health_stat},
            "yaxis": {"title": pollutant}
        }
    }
    return plot_data




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
