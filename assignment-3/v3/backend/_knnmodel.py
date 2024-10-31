import pandas as pd
import joblib
import numpy as np
import os

from sklearn.preprocessing import MinMaxScaler

# Load the data
data = pd.read_csv('__data/annual.csv')

# Define the KNNModel class
class KNNModel:

    # Initialize the model, scaler and label_encoder attributes
    def __init__(self):
        self.scaler = MinMaxScaler()
        self.score_scaler = MinMaxScaler()
        self.scatterplot_data = None

    # Train the model
    def train(self, data):

        # Define the labels and features
        pollutants = data[['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm']]        

        # Scale the pollutants from 0 to 1
        pollutants_scaled = self.scaler.fit_transform(pollutants)

        # Sum the pollutants to get a pollution score, scale again, add to the data
        data['pollution_score'] = self.score_scaler.fit_transform(pollutants_scaled.sum(axis=1).reshape(-1, 1))

        # Define the risk levels
        bins = [-0.1, 0.2, 0.4, 0.6, 0.8, 1.0]
        risk_levels = ['Low Risk', 'Low-Medium', 'Medium Risk', 'Medium High', 'High Risk']
            
        # Add the risk level to the data
        data['risk_level'] = pd.cut(data['pollution_score'], bins=bins, labels=risk_levels)

        # Store the scatterplot data
        self.scatterplot_data = data

        # Save the scalers
        joblib.dump(self.scaler, 'knn_scaler.pkl')
        joblib.dump(self.score_scaler, 'knn_score_scaler.pkl')
        joblib.dump(self.scatterplot_data, 'knn_data.pkl')

    # Predict the risk level for new data
    def predict(self, new_data, label):
        # Load model and scaler
        model_filename = f'lr_model_{label.replace(" ", "_")}.pkl'
        scaler_filename = 'knn_scaler.pkl'
        scaler_score_filename = 'knn_score_scaler.pkl'

        # Check for file existence
        if not os.path.exists(model_filename) or not os.path.exists(scaler_filename) or not os.path.exists(scaler_score_filename):
            raise FileNotFoundError(f"Model or scaler file for label '{label}' not found.")
        
        model = joblib.load(model_filename)
        scaler = joblib.load(scaler_filename)
        scaler_score = joblib.load(scaler_score_filename)

        # Scale the new data
        new_data_scaled = scaler.transform(new_data)

        # Sum the pollutants to get a pollution score, scale again
        new_data_summed = scaler_score.transform(new_data_scaled.sum(axis=1).reshape(-1, 1))

        # Predict the target
        predicted_target = model.predict(new_data_scaled)

        return predicted_target, new_data_summed

if __name__ == "__main__":
    knn_model = KNNModel()
    knn_model.train(data)
