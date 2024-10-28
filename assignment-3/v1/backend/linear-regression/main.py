from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from regressionmodel import LinearRegressionModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = LinearRegressionModel()

class PollutantData(BaseModel):
    pollutant_co: float
    pollutant_no: float
    pollutant_no2: float
    pollutant_ozone: float
    pollutant_pm10: float
    pollutant_s02: float
    health_statistic : str

@app.post("/predict")
def predict_health_status(data: PollutantData):
    try:
        input_data = [[
            data.pollutant_co, data.pollutant_no, data.pollutant_no2, 
            data.pollutant_ozone, data.pollutant_pm10, data.pollutant_s02
        ]]

        prediction = model.predict(input_data, data.health_statistic)

        return {
            "health_status": prediction.tolist(),
            "dependent_variable": data.health_statistic
        }
    
    except Exception as e:
        # Raise an HTTP 500 Internal Server Error if prediction fails
        raise HTTPException(status_code=500, detail="Internal server error")
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)