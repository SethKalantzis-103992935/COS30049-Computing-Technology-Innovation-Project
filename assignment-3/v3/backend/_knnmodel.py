import pandas as pd
import joblib
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler

# Load the data
data = pd.read_csv('__data/annual.csv')

# Define the KNNModel class
class KNNModel:

    # Initialize the model, scaler and label_encoder attributes
    def __init__(self, n_neighbors=5):
        self.n_neighbors = n_neighbors
        self.classifier = KNeighborsClassifier(n_neighbors=self.n_neighbors)
        self.regressor = KNeighborsRegressor(n_neighbors=self.n_neighbors)
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()

    # Train the model
    def train(self):

        # Define the lables for classification and regression
        health_columns = ['asthma deaths', 'asthma edp', 'asthma hospitalisations', 'asthma pic', 
                         'copd deaths', 'copd hospitalisations', 'iap deaths', 
                         'iap hospitalisations']
        for l in health_columns:
            # Select the relevant columns for classification and regression
            pollutants = data[['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm']]
            label = data[l]

            # Assess the label
            def categorize_risk(value):
                if value <= np.percentile(label, 20):
                    return 'Low Risk'
                elif value <= np.percentile(label, 40):
                    return 'Low-Medium Risk'
                elif value <= np.percentile(label, 60):
                    return 'Medium Risk'
                elif value <= np.percentile(label, 80):
                    return 'Medium-High Risk'
                else:
                    return 'High Risk'
                
            # Scale the data
            pollutants_scaled = self.scaler.fit_transform(pollutants)
            
            # Encode the target variable
            risk = np.array([categorize_risk(val) for val in label])
            label_encoded = self.label_encoder.fit_transform(risk)

            # Split the data into training and testing sets
            X_train, X_test, y_train, y_test = train_test_split(pollutants_scaled, label_encoded, test_size=0.2, random_state=42)

            # Train the classifier
            self.classifier.fit(X_train, y_train)

            # Save the classifier and label encoder
            joblib.dump(self.classifier, f'knn_classifier_{l.replace(' ', '_')}.pkl')
            joblib.dump(self.label_encoder, f'knn_encoder_{l.replace(' ', '_')}.pkl')

    # Predict the risk level for new data
    def predict(self, new_data, label):
        # Load models and scaler
        classifier = joblib.load(f'knn_classifier_{label.replace(" ", "_")}.pkl')
        label_encoder = joblib.load(f'knn_encoder_{label.replace(" ", "_")}.pkl')
        model = joblib.load(f'lr_model_{label.replace(" ", "_")}.pkl')
        scaler = joblib.load(f'lr_scaler_{label.replace(" ", "_")}.pkl')

        # Scale the input pollutants
        new_data_scaled = scaler.transform(new_data)

        # Predict risk level and health stat
        risk_encoded = classifier.predict(new_data_scaled)[0]
        health_stat_value = model.predict(new_data_scaled)[0]
        risk_level = label_encoder.inverse_transform([risk_encoded])[0]

        return risk_level, health_stat_value
    
if __name__ == "__main__":
    knn_model = KNNModel()
    knn_model.train()
