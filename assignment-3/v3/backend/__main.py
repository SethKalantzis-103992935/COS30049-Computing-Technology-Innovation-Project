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


@app.get("/knn-model")
def get_plot_data(health_stat: str, pollutant: str, user_co: float, user_no: float, user_no2: float, user_ozone: float, user_pm10: float, user_so2: float, user_health_stat_value: float):
    df = pd.read_csv(DATA_PATH)
    x = df[health_stat].values.tolist()
    y = df[pollutant].values.tolist()

    pollutants_data = df[['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm']].values
    risk_levels = label_encoder.inverse_transform(
        model_classifier.predict(
            scaler.transform(pollutants_data)
        )
    ).tolist()
    
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
