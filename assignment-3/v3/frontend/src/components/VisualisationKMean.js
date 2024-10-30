import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@mui/material';

const VisualisationKMean = ({ predictionResults, predictionValues, clusterData }) => {
    const [predictedPoint, setPredictedPoint] = useState(null);
    const clusterColors = ['red', 'green', 'blue', 'purple', 'orange', 'yellow'];
    const clusterScatterData = {};
    const meshData = {};

    useEffect(() => {
        // Set predictedPoint directly from predictionValues
        if (predictionValues) {
            setPredictedPoint({
                x: predictionValues['CO ppm'],
                y: predictionValues['NO pphm'],
                z: predictionValues['PM10 µg/m³'],
            });
        }
    }, [predictionValues]);

    // Organize cluster data points by cluster, assign colors, and build scatter and mesh data
    clusterData.forEach(point => {
        const cluster = point.cluster;
        const color = clusterColors[cluster % clusterColors.length];

        if (!clusterScatterData[cluster]) {
            clusterScatterData[cluster] = {
                x: [],
                y: [],
                z: [],
                mode: 'markers',
                marker: {
                    size: 4,
                    color: color,
                },
                type: 'scatter3d',
                name: `Cluster ${cluster}`,
            };
        }
        clusterScatterData[cluster].x.push(point['CO ppm']);
        clusterScatterData[cluster].y.push(point['NO pphm']);
        clusterScatterData[cluster].z.push(point['PM10 µg/m³']);

        if (!meshData[cluster]) {
            meshData[cluster] = {
                x: [],
                y: [],
                z: [],
                color: color,
            };
        }
        meshData[cluster].x.push(point['CO ppm']);
        meshData[cluster].y.push(point['NO pphm']);
        meshData[cluster].z.push(point['PM10 µg/m³']);
    });

    const meshDataList = Object.keys(meshData).map(cluster => ({
        x: meshData[cluster].x,
        y: meshData[cluster].y,
        z: meshData[cluster].z,
        alphahull: 0,
        opacity: 0.15,
        color: meshData[cluster].color,
        type: 'mesh3d',
        showlegend: false,
    }));

    return (
        <Box>
            <Plot
                data={[
                    ...Object.values(clusterScatterData),
                    ...meshDataList,
                    predictedPoint && {
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
                    },
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

            {predictionResults && predictionResults.cluster_stats ? (
                <Box>
                    <Typography>Predicted Cluster: {predictionResults.predicted_cluster}</Typography>
                    <Typography>Mean: {predictionResults.cluster_stats.mean}</Typography>
                    <Typography>Median: {predictionResults.cluster_stats.median}</Typography>
                    <Typography>Standard Deviation: {predictionResults.cluster_stats.std_dev}</Typography>
                    <Typography>Min: {predictionResults.cluster_stats.min}</Typography>
                    <Typography>Max: {predictionResults.cluster_stats.max}</Typography>
                </Box>
            ) : (
                <Typography>No prediction results available.</Typography>
            )}
        </Box>
    );
};

export default VisualisationKMean;
