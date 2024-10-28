import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler

data_path = "../__data/annual.csv"

# Define a function to create KNN models
def build_knn_model(data_path, target_stat):
    # Load dataset
    df = pd.read_csv(data_path)

    # Features: pollutants
    X = df[['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm']].values

    # Target: selected health stat
    y = df[target_stat].values

    # Scale the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Define risk levels based on health stat values
    def categorize_risk(value):
        if value <= np.percentile(y, 20):
            return 'Low Risk'
        elif value <= np.percentile(y, 40):
            return 'Low-Medium Risk'
        elif value <= np.percentile(y, 60):
            return 'Medium Risk'
        elif value <= np.percentile(y, 80):
            return 'Medium-High Risk'
        else:
            return 'High Risk'

    # Apply risk classification
    y_risk = np.array([categorize_risk(val) for val in y])

    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y_risk)

    # Split the dataset into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_encoded, test_size=0.2, random_state=42)
    X_train_val, X_test_val, y_train_val, y_test_val = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    # Create KNN classifier for risk level
    knn_classifier = KNeighborsClassifier(n_neighbors=5)
    knn_classifier.fit(X_train, y_train)

    # Create KNN regressor for health stat value
    knn_regressor = KNeighborsRegressor(n_neighbors=5)
    knn_regressor.fit(X_train_val, y_train_val)

    # Return the trained models and scaler for future predictions
    return knn_classifier, knn_regressor, scaler, label_encoder

# Define a function to predict risk level and health stat value for new data points
def predict_risk(model_classifier, model_regressor, scaler, label_encoder, pollutants):
    pollutants_scaled = scaler.transform([pollutants])
    risk_encoded = model_classifier.predict(pollutants_scaled)[0]
    health_stat_value = model_regressor.predict(pollutants_scaled)[0]
    return label_encoder.inverse_transform([risk_encoded])[0], health_stat_value