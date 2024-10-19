from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from model import KMeansModel

app = FastAPI()
kmeans_model = KMeansModel()

class PollutantData(BaseModel):
    pollutant_co: float
    pollutant_no: float
    pollutant_no2: float
    pollutant_ozone: float
    pollutant_pm10: float
    pollutant_s02: float

@app.post("/predict")
async def predict_pollutant_cluster(data: PollutantData):
    try:
        new_data = np.array([[data.pollutant_co, data.pollutant_no, 
                              data.pollutant_no2, data.pollutant_ozone, 
                              data.pollutant_pm10, data.pollutant_s02]])
        predicted_cluster = kmeans_model.predict(new_data)
        return {"predicted_cluster": int(predicted_cluster[0])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
