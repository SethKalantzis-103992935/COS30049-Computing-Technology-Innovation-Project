from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import logging

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

regression_model = LinearRegressionModel()
kmeans_model = KMeansModel()
knn_model = KNNModel()

class PollutantData(BaseModel):
    CO_ppm: float
    NO_pphm: float
    NO2_pphm: float
    OZONE_pphm: float
    PM10_ug_m3: float
    SO2_pphm: float
    label: str



# Get the health status prediction using the regression model based on provided pollutant data
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
    


# Get the cluster and label statistics based on the provided pollutant data
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
    


# Get the risk level and health status value based on the provided pollutant data
@app.post("/knn-model")
async def predict_knn_risk(data: PollutantData):
    try:
        
        # Get the new values to predict
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
    

# Get the point data for the K-Means model
@app.get("/cluster-model")
async def get_kmeans_data():
    if kmeans_model.clustered_data is None:
        raise HTTPException(status_code=404, detail="Clustered data not available")
    return kmeans_model.clustered_data.to_dict(orient="records")

    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)