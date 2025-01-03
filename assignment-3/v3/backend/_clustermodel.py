import pandas as pd
import joblib
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Load the data
data = pd.read_csv('__data/annual.csv')

# Define the KMeansModel class
class KMeansModel:

    # Initialize the model, scaler and clustered_data attributes
    def __init__(self):
        self.model = KMeans(n_clusters=6, random_state=42)
        self.scaler = StandardScaler()
        self.clustered_data = None

    # Train the model
    def train(self, data):

        # Select the relevant columns for clustering (PCA reduced)
        pollutants = data[['CO ppm', 'NO pphm', 'PM10 µg/m³']]
        
        # Scale the data
        pollutants_scaled = self.scaler.fit_transform(pollutants)

        # Fit the model
        self.model.fit(pollutants_scaled)

        # Add the cluster labels to the data
        data['cluster'] = self.model.predict(pollutants_scaled)

        # Store the clustered data
        self.clustered_data = data

        # Save the model, scaler and clustered data to .pkl files
        joblib.dump(self.model, 'km_model.pkl')
        joblib.dump(self.scaler, 'km_scaler.pkl')
        joblib.dump(self.clustered_data, 'km_data.pkl')

    # Predict the cluster for new data
    def predict(self, new_data):

        # Load the model, scaler and clustered data
        model = joblib.load('km_model.pkl')
        scaler = joblib.load('km_scaler.pkl')
        self.clustered_data = joblib.load('km_data.pkl')

        # Scale the new data
        new_data_scaled = scaler.transform(new_data)

        # Predict the cluster
        predicted_cluster = model.predict(new_data_scaled)

        # Return the predicted cluster
        return predicted_cluster

    # Get statistics for a specific cluster and label
    def get_cluster_statistics(self, cluster, label):

        # Check if the clustered data is available
        if self.clustered_data is None:
            raise ValueError("No clustered data available. Please train the model first.")
        
        # Check if the label is valid
        if label not in self.clustered_data.columns:
            raise ValueError(f"Invalid label: {label}")

        # Get the data for the specified cluster
        cluster_data = self.clustered_data[self.clustered_data['cluster'] == cluster]
        
        # Get the statistics for the specified label
        mean_value = cluster_data[label].mean()
        median_value = cluster_data[label].median()
        std_dev_value = cluster_data[label].std()
        max_value = cluster_data[label].max()
        min_value = cluster_data[label].min()

        # Return the statistics
        return {
            "mean": mean_value,
            "median": median_value,
            "std_dev": std_dev_value,
            "max": max_value,
            "min": min_value
        }

# Run main to train the model and generate the .pkl files
if __name__ == "__main__":
    kmeans_model = KMeansModel()
    kmeans_model.train(data)