from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from knnmodel import KNNModel  # Assuming you have a KNNModel class

app = FastAPI()

# Initialize the KNN model
knn_model = KNNModel()

# Train the model upon starting the API
try:
    evaluation_metrics = knn_model.train()  # Ensure the model is trained
    print("Model trained successfully.")
except Exception as e:
    print("Error during model training:", str(e))

# Define the expected input data format for the API request
class PollutantData(BaseModel):
    pollutant_co: float
    pollutant_no: float
    pollutant_no2: float
    pollutant_ozone: float
    pollutant_pm10: float
    pollutant_s02: float

@app.post("/predict")
def predict_risk_level(data: PollutantData):
    try:
        # Prepare input data for prediction
        input_data = np.array([[
            data.pollutant_co, data.pollutant_no, data.pollutant_no2, 
            data.pollutant_ozone, data.pollutant_pm10, data.pollutant_s02, 
            data.asthma_edp  # Include asthma_edp in the input
        ]])

        # Make the prediction using the input data
        prediction = knn_model.predict(input_data)

        return {
            "risk_level": prediction.tolist()  # Convert numpy array to a list
        }
    
    except Exception as e:
        # Raise an HTTP 500 Internal Server Error if prediction fails
        raise HTTPException(status_code=500, detail=str(e))

# Set up CORS (if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)