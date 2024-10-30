import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@mui/material';

const VisualisationKMean = ({ clusterStats, predictionValues, clusterData }) => {
    const [predictedPoint, setPredictedPoint] = useState(null);
    const [predictedCluster, setPredictedCluster] = useState(null);
    const clusterColors = ['red', 'green', 'blue', 'purple', 'orange', 'yellow'];
    const clusterScatterData = {};
    const meshData = {};

    useEffect(() => {
        const fetchPredictedCluster = async () => {
            if (predictionValues) {
                const newPredictedPoint = {
                    x: predictionValues['CO ppm'],
                    y: predictionValues['NO pphm'],
                    z: predictionValues['PM10 µg/m³'],
                };

                setPredictedPoint(newPredictedPoint);
            }
        };

        fetchPredictedCluster();
    }, [predictionValues]);

    return (
        <Box>
            <Plot
                data={[
                    // Existing cluster data
                    clusterData && {
                        x: clusterData.map(point => point['CO ppm']),
                        y: clusterData.map(point => point['NO pphm']),
                        z: clusterData.map(point => point['PM10 µg/m³']),
                        mode: 'markers',
                        type: 'scatter3d',
                        marker: {
                            size: 5,
                            color: 'blue',
                        },
                        name: 'Cluster Points',
                    },
                    // Predicted point
                    predictedPoint ? {
                        x: [predictedPoint.x],
                        y: [predictedPoint.y],
                        z: [predictedPoint.z],
                        mode: 'markers',
                        marker: {
                            size: 10,
                            color: 'red',
                            symbol: 'cross',
                        },
                        type: 'scatter3d',
                        name: 'Predicted Point',
                    } : null,
                ].filter(Boolean)}
                layout={{
                    title: 'K-Means Clusters For Air Quality Data',
                    scene: {
                        xaxis: { title: 'CO ppm' },
                        yaxis: { title: 'NO pphm' },
                        zaxis: { title: 'PM10 µg/m³' },
                    },
                    autosize: true,
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: {
                        family: 'Arial, sans-serif',
                        size: 12,
                        color: '#ffffff',
                    },
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
            />

            {clusterStats && (
                <Box>
                    <Typography>Predicted Cluster: {clusterStats.predicted_cluster}</Typography>
                    <Typography>Mean: {clusterStats.cluster_stats.mean}</Typography>
                    <Typography>Median: {clusterStats.cluster_stats.median}</Typography>
                    <Typography>Standard Deviation: {clusterStats.cluster_stats.std_dev}</Typography>
                    <Typography>Min: {clusterStats.cluster_stats.min}</Typography>
                    <Typography>Max: {clusterStats.cluster_stats.max}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default VisualisationKMean;
