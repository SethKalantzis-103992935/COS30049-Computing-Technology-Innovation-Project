import React from 'react'
import { Box, Container, Typography } from '@mui/material'

const StatsBox = ({
    predictionValues,
    predictionResults,
    selectedHealthStat,
    selectedPollutant,
    selectedModel
}) => {

    // Display names for health statistics
    const displayNames = {
        "asthma deaths": "Asthma Deaths",
        "asthma edp": "Asthma Emergency Department Presentations",
        "asthma hospitalisations": "Asthma Hospitalisations",
        "asthma pic": "Asthma Prevalence in Children",
        "copd deaths": "Chronic Obstructive Pulmonary Disease Deaths",
        "copd hospitalisations": "Chronic Obstructive Pulmonary Disease Hospitalisations",
        "iap deaths": "Influenza and Pneumonia Deaths",
        "iap hospitalisations": "Influenza and Pneumonia Hospitalisations",
    };

    const formatLinearRegression = () => {
        const healthStatus = predictionResults.health_status
            ? Number(predictionResults.health_status).toFixed(2)
            : 'N/A';
        return {
            'Head': `Predicted ${displayNames[selectedHealthStat]} per 100,000 people: ${healthStatus}`,
            'Description': [
                'This Radar Chart is used to display the prediction results of the Linear Regression model. The chart displays the predicted values for each pollutant, to visualize how extreme the predicted values are compared to all recorded values of that pollutant.',
                `With the values you have provided, our model has predicted that there would be ${healthStatus} ${displayNames[selectedHealthStat]} per 100,000 people.`
            ]
        }
    }

    const formatKMeans = () => {
        const clusterStats = predictionResults.cluster_stats || {};
        const mean = clusterStats.mean !== undefined ? Number(clusterStats.mean).toFixed(2) : 'N/A';
        const std = clusterStats.std_dev !== undefined ? Number(clusterStats.std_dev).toFixed(2) : 'N/A';
        const min = clusterStats.min !== undefined ? Number(clusterStats.min).toFixed(2) : 'N/A';
        const max = clusterStats.max !== undefined ? Number(clusterStats.max).toFixed(2) : 'N/A';
    
        return {
            'Head': `Predicted ${displayNames[selectedHealthStat]} per 100,000 people: ${mean}`,
            'SubHead': [
                `Cluster ${predictionResults.predicted_cluster !== undefined ? predictionResults.predicted_cluster : 'N/A'}`,
            ],
            'Description': [
                'This 3D Scatter Plot is used to display the prediction results of the K-Means Clustering model. The plot displays the predicted cluster of the given data point, as well as the clusters of all recorded data points. The predicted cluster is highlighted in a different color to distinguish it from the other clusters.',
                `For every cluster, we can determine the expected values for a given health statistic. With the values you have provided, our model has predicted that the given data point belongs to Cluster ${predictionResults.predicted_cluster !== undefined ? predictionResults.predicted_cluster : 'N/A'}. This means that the expected number of ${displayNames[selectedHealthStat]} per 100,000 people is ${mean}. For this cluster, the standard deviation is ${std}, the minimum value is ${min}, and the maximum value is ${max}.`
            ]
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
            <Typography variant='h5' sx={styles.headText}>
                {formatStats().Head}
            </Typography>
            {formatStats().SubHead && formatStats().SubHead.map((subHead, index) => (
                <Typography key={index} variant='subtitle1' sx={styles.subHeadText}>
                    {subHead}
                </Typography>
            ))}
            {Array.isArray(formatStats().Description) ? (
                formatStats().Description.map((desc, index) => (
                    <Typography key={index} variant='body1' sx={styles.bodyText}>
                        {desc}
                    </Typography>
                ))
            ) : (
                <Typography variant='body1' sx={styles.bodyText}>
                    {formatStats().Description}
                </Typography>
            )}
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
    },
    headText: {
        textAlign: 'left'
    },
    subHeadText: {
        marginTop: '10px',
        textAlign: 'left',
        fontStyle: 'italic'
    },
    bodyText: {
        marginTop: '20px',
        textAlign: 'justify'
    }
}

export default StatsBox