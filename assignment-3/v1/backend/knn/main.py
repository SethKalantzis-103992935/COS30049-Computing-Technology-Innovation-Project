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
    allow_origins=["*"],  
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

# Endpoint to predict risk level and health stat value based on pollutants and chosen health stat
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
        model_classifier, model_regressor, scaler, label_encoder = build_knn_model(DATA_PATH, health_stat)
        MODEL_CACHE[health_stat] = (model_classifier, model_regressor, scaler, label_encoder)
    else:
        model_classifier, model_regressor, scaler, label_encoder = MODEL_CACHE[health_stat]

    # Predict the risk level and health stat value
    risk_level, health_stat_value = predict_risk(model_classifier, model_regressor, scaler, label_encoder, pollutants)
    
    return {
        "risk_level": risk_level,
        "health_stat_value": health_stat_value
    }

@app.get("/plot_data")
def get_plot_data(health_stat: str, pollutant: str):
    # Ensure the model for the requested health stat is built and cached
    if health_stat not in MODEL_CACHE:
        model_classifier, model_regressor, scaler, label_encoder = build_knn_model(DATA_PATH, health_stat)
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