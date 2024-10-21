# Import Libraries
import pandas as pd  # For data manipulation and analysis
from sklearn.neighbors import KNeighborsClassifier  # For K-Nearest Neighbors classifier
from sklearn.model_selection import train_test_split  # For splitting data
from sklearn.preprocessing import MinMaxScaler, StandardScaler  # For feature scaling
from sklearn.metrics import accuracy_score, classification_report  # For evaluation metrics
import joblib  # For saving and loading models

# Load the dataset
data = pd.read_csv("../__data/monthly.csv")

# Define pollutant columns
pollutant_columns = ['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm']

# Scale pollutant values using MinMaxScaler
scaler = MinMaxScaler()
data[pollutant_columns] = scaler.fit_transform(data[pollutant_columns])

# Calculate pollution score as a sum of the pollutant values
data['pollution score'] = scaler.fit_transform(data[pollutant_columns].sum(axis=1).values.reshape(-1, 1))

correlation = data['asthma edp'].corr(data['pollution score'])

# Define risk levels
bins = [-0.1, 0.33, 0.66, 1]
labels = ['Low Risk', 'Medium Risk', 'High Risk']

data['health risk score'] = data['pollution score'] * correlation
data['health risk score'] = scaler.fit_transform(data['health risk score'].values.reshape(-1, 1))

data['risk level'] = pd.cut(data['health risk score'], bins=bins, labels=labels)

# Define the KNNModel class
class KNNModel:
    def __init__(self, n_neighbors=13):
        self.model = KNeighborsClassifier(n_neighbors=n_neighbors)
        self.scaler = StandardScaler()

    def train(self):
        # Define features and target
        features = data.drop(['year-month','lhd','health risk score','risk level'], axis=1)
        target = data['risk level']

        risk_mapping = {'Low Risk': 0, 'Medium Risk': 1, 'High Risk': 2}
        target_numeric = target.map(risk_mapping)

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(features, target_numeric, test_size=0.2, random_state=42)

        # Fit the scaler to the training data and scale both training and test sets
        self.scaler.fit(X_train)
        X_train_scaled = self.scaler.transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)

        # Train the model
        self.model.fit(X_train_scaled, y_train)

        # Save the model and scaler
        joblib.dump(self.model, 'knn_model.pkl')
        joblib.dump(self.scaler, 'scaler.pkl')

        # Evaluate the model
        predictions = self.model.predict(X_test_scaled)

        accuracy = accuracy_score(y_test, predictions)
        report = classification_report(y_test, predictions)

        return {
            "message": "Model trained successfully",
            "accuracy": accuracy,
            "classification_report": report
        }

    def predict(self, new_data):
        # Load the model and scaler
        model = joblib.load('knn_model.pkl')
        scaler = joblib.load('scaler.pkl')

        # Create a DataFrame for the new data with the correct feature names
        feature_names = ['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm']
        new_data_df = pd.DataFrame(new_data, columns=feature_names)

        # Scale the input data using the loaded scaler
        new_data_scaled = scaler.transform(new_data_df)

        # Make the prediction
        prediction = model.predict(new_data_scaled)

        return prediction

if __name__ == "__main__":
    knn_model = KNNModel()
    evaluation_metrics = knn_model.train()
    
    # Print evaluation metrics
    print("Training Metrics:")
    print("Accuracy:", evaluation_metrics["accuracy"])
    print("Classification Report:\n", evaluation_metrics["classification_report"])