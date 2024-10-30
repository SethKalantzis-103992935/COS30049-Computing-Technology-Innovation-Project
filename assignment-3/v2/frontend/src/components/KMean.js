import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@mui/material';

const KMean = ({ sliderValues, onPredict, xAxis, yAxis, zAxis }) => {
    const [predictedPoint, setPredictedPoint] = useState(null);
    const [predictedCluster, setPredictedCluster] = useState(null);
    const [clusterStats, setClusterStats] = useState(null);

    useEffect(() => {
        const fetchPredictedCluster = async () => {
            if (sliderValues) {
                const newPredictedPoint = {
                    x: sliderValues[xAxis],
                    y: sliderValues[yAxis],
                    z: sliderValues[zAxis],
                };

                // Wait for the predicted cluster to resolve
                const response = await onPredict(sliderValues);
                setPredictedPoint(newPredictedPoint);
                setPredictedCluster(response.predicted_cluster);
                setClusterStats(response.cluster_stats);
            }
        };

        fetchPredictedCluster();
    }, [sliderValues, xAxis, yAxis, zAxis, onPredict]);

    return (
        <Box>
            <Plot
                data={[
                    predictedPoint ? {
                        x: [predictedPoint.x],
                        y: [predictedPoint.y],
                        z: [predictedPoint.z],
                        mode: 'markers',
                        marker: {
                            size: 10,
                            color: 'black',
                            symbol: 'cross',
                        },
                        type: 'scatter3d',
                        name: 'Predicted Point',
                    } : null,
                ].filter(Boolean)}
                layout={{
                    title: 'K-Means Clusters For Air Quality Data',
                    scene: {
                        xaxis: { title: xAxis },
                        yaxis: { title: yAxis },
                        zaxis: { title: zAxis },
                    },
                    autosize: true,
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: {
                        family: 'Arial, sans-serif',
                        size: 12,
                        color: '#ffffff',
                    },
                    scene: {
                        xaxis: {
                            title: xAxis,
                            titlefont: { color: '#ffffff' },
                            tickfont: { color: '#ffffff' },
                            gridcolor: '#444444',
                            zerolinecolor: '#444444',
                            linecolor: '#444444',
                        },
                        yaxis: {
                            title: yAxis,
                            titlefont: { color: '#ffffff' },
                            tickfont: { color: '#ffffff' },
                            gridcolor: '#444444',
                            zerolinecolor: '#444444',
                            linecolor: '#444444',
                        },
                        zaxis: {
                            title: zAxis,
                            titlefont: { color: '#ffffff' },
                            tickfont: { color: '#ffffff' },
                            gridcolor: '#444444',
                            zerolinecolor: '#444444',
                            linecolor: '#444444',
                        },
                    },
                }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
            />

            {clusterStats && (
                <Box>
                    <Typography>Mean: {clusterStats.mean}</Typography>
                    <Typography>Median: {clusterStats.median}</Typography>
                    <Typography>Standard Deviation: {clusterStats.std_dev}</Typography>
                    <Typography>Max: {clusterStats.max}</Typography>
                    <Typography>Min: {clusterStats.min}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default KMean;
