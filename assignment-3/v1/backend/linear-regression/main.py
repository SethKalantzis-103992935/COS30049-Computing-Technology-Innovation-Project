from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from regressionmodel import LinearRegressionModel

app = FastAPI()

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

        metrics = model.train(data.health_statistic)

        prediction = model.predict(input_data)

        return {
            "health_status": prediction.tolist(),
            "dependent_variable": data.health_statistic,
            "evaluation_metrics": metrics
            }
    
    except Exception as e:
        # Raise an HTTP 500 Internal Server Error if prediction fails
        raise HTTPException(status_code=500, detail="Internal server error")
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)