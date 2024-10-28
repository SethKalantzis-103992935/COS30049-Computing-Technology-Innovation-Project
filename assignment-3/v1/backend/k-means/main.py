from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from model import KMeansModel
from fastapi.middleware.cors import CORSMiddleware
import joblib

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

kmeans_model = KMeansModel()

# Define the input data model
class PollutantData(BaseModel):
    CO_ppm: float
    NO_pphm: float
    NO2_pphm: float
    OZONE_pphm: float
    PM10_ug_m3: float
    SO2_pphm: float
    label: str

# Define the predict endpoint for K-Means
@app.post("/predict")
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
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("startup")
async def load_model():
    try:
        global kmeans_model
        kmeans_model = KMeansModel()
        kmeans_model.clustered_data = joblib.load('clustered_data.pkl')  # Load the clustered data if available
    except Exception as e:
        print(f"Error loading the model: {e}")

@app.get("/kmeans")
async def get_kmeans_data():
    if kmeans_model.clustered_data is None:
        raise HTTPException(status_code=404, detail="Clustered data not available")
    return kmeans_model.clustered_data.to_dict(orient="records")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)