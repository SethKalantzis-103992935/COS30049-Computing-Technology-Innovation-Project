# Import Libraries
import pandas as pd  # For data manipulation and analysis
from sklearn.linear_model import LinearRegression  # For linear regression models
from sklearn.model_selection import train_test_split  # For splitting data into training and testing sets
from sklearn.preprocessing import StandardScaler  # For feature scaling
import joblib  # For saving and loading models
import os  # For interacting with the operating system

# Load the data
data = pd.read_csv('__data/annual.csv')

# Define the LinearRegressionModel class
class LinearRegressionModel:

    # Initialize the model and scaler attributes
    def __init__(self): 
        self.model = LinearRegression()
        self.scaler = StandardScaler()

    # Train the model
    def train(self):
        label_columns = ['asthma deaths', 'asthma edp', 'asthma hospitalisations', 'asthma pic', 'copd deaths', 'copd hospitalisations', 'iap deaths', 'iap hospitalisations']
        for l in label_columns:
            # Select the relevant columns for regression
            features = data[['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm']]
            label = data[l]
        
            features_scaled = self.scaler.fit_transform(features)

            # Split the data into training and testing sets
            X_train, X_test, y_train, y_test = train_test_split(features_scaled, label, test_size=0.2, random_state=42)

            # Fit the model
            self.model.fit(X_train, y_train)

            # Save the model and scaler with the label name in the filename
            joblib.dump(self.model, f'lr_model_{l.replace(" ", "_")}.pkl')
            joblib.dump(self.scaler, f'lr_scaler_{l.replace(" ", "_")}.pkl')

    # Predict the target for new data
    def predict(self, new_data, label):
        # Load the model and scaler
        model_filename = f'lr_model_{label.replace(" ", "_")}.pkl'
        scaler_filename = f'lr_scaler_{label.replace(" ", "_")}.pkl'

        # Check if both files exist
        if not os.path.exists(model_filename) or not os.path.exists(scaler_filename):
            raise FileNotFoundError(f"Model or scaler file for label '{label}' not found.")

        model = joblib.load(model_filename)
        scaler = joblib.load(scaler_filename)

        # Scale the new data
        new_data_scaled = scaler.transform(new_data)

        # Predict the target
        predicted_target = model.predict(new_data_scaled)

        # Return the predicted target
        return predicted_target

if __name__ == "__main__":
    linear_regression_model = LinearRegressionModel()
    evaluation_metrics = linear_regression_model.train()