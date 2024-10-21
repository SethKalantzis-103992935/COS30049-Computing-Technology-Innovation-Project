# Import Libraries
import pandas as pd  # For data manipulation and analysis
from sklearn.linear_model import LinearRegression  # For linear regression models
from sklearn.metrics import r2_score, mean_squared_error, explained_variance_score  # For model evaluation metrics
from sklearn.model_selection import train_test_split  # For splitting data into training and testing sets
from sklearn.preprocessing import StandardScaler  # For feature scaling
import joblib  # For saving and loading models

# Load the data
data = pd.read_csv('../__data/annual.csv')

# Define the LinearRegressionModel class
class LinearRegressionModel:

    # Initialize the model and scaler attributes
    def __init__(self): 
        self.model = LinearRegression()
        self.scaler = StandardScaler()

    # Train the model
    def train(self, label_column):

        # Select the relevant columns for regression
        features = data[['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm']]
        label = data[label_column]
        
        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(features, label, test_size=0.2, random_state=42)

        # Scale the data
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)

        # Fit the model
        self.model.fit(X_train_scaled, y_train)

        # Predict on the test set
        y_pred = self.model.predict(X_test_scaled)

        # Evaluate the model
        r2 = r2_score(y_test, y_pred)
        mse = mean_squared_error(y_test, y_pred)
        evs = explained_variance_score(y_test, y_pred)

        # Save the model and scaler
        joblib.dump(self.model, 'linear_regression_model.pkl')
        joblib.dump(self.scaler, 'scaler.pkl')

        # Return the evaluation metrics
        return {
            "r2_score": r2,
            "mean_squared_error": mse,
            "explained_variance_score": evs
        }

    # Predict the target for new data
    def predict(self, new_data):

        # Load the model and scaler
        model = joblib.load('linear_regression_model.pkl')
        scaler = joblib.load('scaler.pkl')

        # Scale the new data
        new_data_scaled = scaler.transform(new_data)

        # Predict the target
        predicted_target = model.predict(new_data_scaled)

        # Return the predicted target
        return predicted_target

if __name__ == "__main__":
    linear_regression_model = LinearRegressionModel()
    evaluation_metrics = linear_regression_model.train('asthma edp')