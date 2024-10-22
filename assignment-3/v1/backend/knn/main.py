from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from knnmodel import build_knn_model, predict_risk
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Load the dataset and build the model once at startup
DATA_PATH = "../__data/annual.csv"
MODEL_CACHE = {}

# Define a Pydantic model for the input data
class PollutantInput(BaseModel):
    co_ppm: float
    no_pphm: float
    no2_pphm: float
    ozone_pphm: float
    pm10_ug_m3: float
    so2_pphm: float
    health_stat: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint to get available health statistics
@app.get("/health_stats")
def get_health_stats():
    health_stats = [
        "asthma deaths", 
        "asthma edp", 
        "asthma hospitalisations", 
        "asthma pic",
        "copd deaths", 
        "copd hospitalisations", 
        "iap deaths", 
        "iap hospitalisations"
    ]
    return {"health_stats": health_stats}

# Endpoint to predict risk level based on pollutants and chosen health stat
@app.post("/predict")
def predict_risk_level(input_data: PollutantInput):
    # Extract pollutants and health stat from input
    pollutants = [
        input_data.co_ppm,
        input_data.no_pphm,
        input_data.no2_pphm,
        input_data.ozone_pphm,
        input_data.pm10_ug_m3,
        input_data.so2_pphm
    ]
    health_stat = input_data.health_stat

    # Build the KNN model for the requested health stat (or reuse cached model)
    if health_stat not in MODEL_CACHE:
        model, scaler, label_encoder = build_knn_model(DATA_PATH, health_stat)
        MODEL_CACHE[health_stat] = (model, scaler, label_encoder)
    else:
        model, scaler, label_encoder = MODEL_CACHE[health_stat]

    # Predict the risk level
    risk_level = predict_risk(model, scaler, label_encoder, pollutants)
    
    return {
        "risk_level": risk_level
        }