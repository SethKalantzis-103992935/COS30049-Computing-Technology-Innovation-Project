import pandas as pd
import joblib
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

data = pd.read_csv('../__data/annual.csv')

class KMeansModel:
    def __init__(self):
        self.model = KMeans(n_clusters=6, random_state=42)
        self.scaler = StandardScaler()

    def train(self, data):
        pollutants = data[['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 
                           'PM10 µg/m³', 'SO2 pphm']]
        pollutants_scaled = self.scaler.fit_transform(pollutants)
        self.model.fit(pollutants_scaled)
        joblib.dump(self.model, 'kmeans_model.pkl')
        joblib.dump(self.scaler, 'scaler.pkl')

    def predict(self, new_data):
        model = joblib.load('kmeans_model.pkl')
        scaler = joblib.load('scaler.pkl')
        new_data_scaled = scaler.transform(new_data)
        predicted_cluster = model.predict(new_data_scaled)
        return predicted_cluster

if __name__ == "__main__":
    kmeans_model = KMeansModel()
    kmeans_model.train(data)        