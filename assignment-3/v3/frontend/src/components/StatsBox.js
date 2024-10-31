import React from 'react'
import { Box, Container } from '@mui/material'

const StatsBox = ({
    predictionValues, 
    predictionResults, 
    selectedHealthStat, 
    selectedPollutant, 
    selectedModel 
}) => {

    const formatLinearRegression = () => {
        return {
            'Description': 
              'This Radar Chart is used to display the prediction results of the Linear Regression '
            + 'model. The chart displays the predicted values for each pollutant, to visualize how '
            + 'extreme the predicted values are compared to all recorded values of that pollutant. '
            + '\n'
            + 'With the values you have provided, the model has predicted the following values for '
        }
    }

    const formatKMeans = () => {
        return {
            'Model': 'K-Means Clustering',
            'Health Statistic': selectedHealthStat,
            'Prediction Value': predictionValues,
            'Prediction Result': predictionResults
        }
    }

    const formatKNN = () => {
        return {
            'Model': 'KNN Clustering',
            'Health Statistic': selectedHealthStat,
            'Pollutant': selectedPollutant,
            'Prediction Value': predictionValues,
            'Prediction Result': predictionResults
        }
    }

    const formatStats = () => {
        switch (selectedModel) {
            case 'linear':
                return formatLinearRegression()
            case 'kmeans':
                return formatKMeans()
            case 'knn':
                return formatKNN()
            default:
                return {}
        }
    }

    return (
        <Container sx={styles.container}>
            {formatStats().Description}
        </Container>
    )
}

const styles = {
    container: {
        backgroundColor: '#44434a',
        color: 'text.primary',
        borderRadius: 1,
        padding: 2,
        marginTop: '40px',
    }
}

export default StatsBox