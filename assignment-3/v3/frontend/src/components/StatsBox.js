import React from 'react';
import { Container, Typography, useTheme } from '@mui/material';
import { displayNames } from '../constants/DisplayNames';

const StatsBox = ({
    predictionValues,
    predictionResults,
    selectedHealthStat,
    selectedPollutant,
    selectedModel
}) => {
    const theme = useTheme();

    const riskLevels = [
        { level: 'Low', range: [0, 0.2], color: theme.palette.graph.greenPoint },
        { level: 'Low-Medium', range: [0.2, 0.4], color: theme.palette.graph.bluePoint },
        { level: 'Medium', range: [0.4, 0.6], color: theme.palette.graph.yellowPoint },
        { level: 'Medium-High', range: [0.6, 0.8], color: theme.palette.graph.orangePoint },
        { level: 'High', range: [0.8, 1], color: theme.palette.graph.redPoint }
    ];

    const getRiskLevel = (score) => {
        for (const { level, range } of riskLevels) {
            if (score >= range[0] && score < range[1]) {
                return level;
            }
        }
        return 'Unknown'; // Fallback if score doesn't match any range
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
        };
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
        };
    }
    
    const formatKNN = () => {
        const healthStatus = predictionResults.health_status 
            ? Number(predictionResults.health_status[0]).toFixed(2) 
            : 'N/A';
        const dependentVariable = predictionResults.dependent_variable 
            ? Number(predictionResults.dependent_variable[0]).toFixed(2) 
            : 'N/A';

        // Calculate risk level based on health status (pollution score)
        const pollutionScore = parseFloat(healthStatus); // Assuming healthStatus reflects the pollution score
        const riskLevel = getRiskLevel(pollutionScore);

        return {
            'Head': `Predicted ${displayNames[selectedHealthStat]} per 100,000 people: ${healthStatus}`,
            'SubHead': [
                `Risk Level: ${riskLevel}`
            ],
            'Description': [
                `This Scatter Plot is used to display the results of the KNN Classification model. The plot displays the predicted risk levels of all provided data points. Based on the pollution levels you have provided, you can expect ${healthStatus} ${displayNames[selectedHealthStat]} per 100,000 people.`,
            ]
        };
    }

    const formatStats = () => {
        switch (selectedModel) {
            case 'linear':
                return formatLinearRegression();
            case 'kmeans':
                return formatKMeans();
            case 'knn':
                return formatKNN();
            default:
                return {};
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
    );
}

const styles = {
    container: {
        backgroundColor: '#44434a',
        color: 'text.primary',
        borderRadius: 1,
        padding: 2,
        marginTop: '40px',
        width: '100%',
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

export default StatsBox;
