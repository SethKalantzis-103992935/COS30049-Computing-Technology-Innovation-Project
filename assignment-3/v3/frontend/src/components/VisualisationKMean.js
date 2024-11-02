/**
 * VisualisationKMean.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 12, 2024
 * Last Modified: November 02, 2024
 * 
 * Purpose:
 * This component visualizes K-Means clustering results for air quality data in a 3D scatter plot. 
 * It displays clusters of data points based on pollutant levels and highlights the predicted 
 * point based on user input values, allowing for an interactive examination of the clustering. 
 * Points are colored based on their respective clusters, and a mesh is used to visualize the 
 * boundaries of each cluster.
 * 
 * Usage: 
 * This component is used to display the results of K-Means clustering on air quality data,
 * enabling users to visualize how different pollutants interact and their respective clusters.
 */

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// VisualisationKMean Component
const VisualisationKMean = ({ predictionResults, predictionValues, clusterData }) => {

    const theme = useTheme();
    const [predictedPoint, setPredictedPoint] = useState(null);
    const clusterScatterData = {};
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    /**
    * Define the initial camera position for the 3D scatter plot.
    */
    const [camera, setCamera] = useState({
        eye: isMobile ? { x: 2.5, y: 2.5, z: 1.5 } : { x: 1.5, y: 1.5, z: 1 },
        up: { x: 0, y: 0, z: 1 },
        center: { x: 0, y: 0, z: -0.2 }
    });

    /**
    * Define the colors for each cluster in the 3D scatter plot.
    */
    const clusterColors = [
        theme.palette.graph.pinkPoint,
        theme.palette.graph.orangePoint,
        theme.palette.graph.bluePoint,
        theme.palette.graph.purplePoint,
        theme.palette.graph.redPoint,
        theme.palette.graph.greenPoint
    ];

    /**
    * Determines the color of the predicted point based on the cluster it belongs to.
    * If the cluster index is valid, it returns the corresponding cluster color - otherwise it 
    * defaults to black.
    */
    const getPredictedPointColor = () => {
        if (predictionResults && predictionResults.predicted_cluster !== undefined) {
            const clusterIndex = predictionResults.predicted_cluster;
            return clusterColors[clusterIndex % clusterColors.length];
        }
        return theme.palette.graph.blackDefault;
    };

    /** 
    * Iterate through the cluster data to populate the scatter data for visualization. 
    * Each data point is assigned to a cluster and colored accordingly. 
    */
    clusterData.forEach(point => {
        const cluster = point.cluster;
        const color = clusterColors[cluster % clusterColors.length];

        // Initialize scatter data for each cluster
        if (!clusterScatterData[cluster]) {
            clusterScatterData[cluster] = {
                x: [],
                y: [],
                z: [],
                mode: 'markers',
                marker: {
                    size: 3,
                    color: color,
                },
                type: 'scatter3d',
                name: `Cluster ${cluster}`,
            };
        }

        // Populate scatter data with pollutant values
        clusterScatterData[cluster].x.push(point['CO ppm']);
        clusterScatterData[cluster].y.push(point['NO pphm']);
        clusterScatterData[cluster].z.push(point['PM10 µg/m³']);
    });

    /**
    * Combine scatter data to create the final plot data for visualization. 
    * This includes the cluster scatter data, the cluster mesh data, and the predicted point.
    * The predicted point is highlighted with an 'x' symbol and colored based on its cluster.
    * 
    * The plot also includes dummy legend entries for each cluster to display the cluster colors.
    * Plotly does not support a legend with different marker sizes on the legend vs the plot itself,
    * so this is a workaround to display the cluster colors in the legend at the desired size.
    */
    const plotData = [
        // Scatter data for each cluster
        ...Object.values(clusterScatterData).map(trace => ({
            ...trace,
            marker: {
                ...trace.marker,
                size: isMobile
                    ? 3
                    : 4,
            },
            showlegend: false,
            hoverinfo: 'none',
        })),

        // Mesh data for cluster boundaries
        ...Object.keys(clusterScatterData).map(cluster => ({
            x: clusterScatterData[cluster].x,
            y: clusterScatterData[cluster].y,
            z: clusterScatterData[cluster].z,
            alphahull: 0,
            opacity: 0.15,
            color: clusterColors[cluster % clusterColors.length],
            type: 'mesh3d',
            showlegend: false,
        })),

        // Predicted point data
        predictedPoint && {
            x: [predictedPoint.x],
            y: [predictedPoint.y],
            z: [predictedPoint.z],
            mode: 'markers',
            marker: {
                color: getPredictedPointColor(),
                line: { color: 'black', width: 2 },
                size: 8,
                symbol: 'x',
            },
            type: 'scatter3d',
            name: 'Predicted Point',
            showlegend: false,
            hoverinfo: 'text',
            text: [
                `Cluster: ${predictionResults.predicted_cluster}<br>` +
                `CO ppm: ${predictedPoint.x.toFixed(3)}<br>` +
                `NO pphm: ${predictedPoint.y.toFixed(3)}<br>` +
                `PM10 µg/m³: ${predictedPoint.z.toFixed(3)}`
            ]
        },

        // Dummy Legend Entries for Cluster Colors
        ...Array.from({ length: 6 }, (_, i) => ({
            x: [null], // No actual data points to plot
            y: [null],
            z: [null],
            mode: 'markers',
            marker: {
                size: 10,
                color: clusterColors[i % clusterColors.length],
            },
            type: 'scatter3d',
            name: `Cluster ${i}`,
            showlegend: true,
            hoverinfo: 'none',
        })),
    ].filter(Boolean);

    /**
    * Effect hook to update the predicted point when new prediction values are received.
    */
    useEffect(() => {
        if (predictionValues) {
            const newPredictedPoint = {
                x: predictionValues['CO ppm'],
                y: predictionValues['NO pphm'],
                z: predictionValues['PM10 µg/m³'],
            };
            setPredictedPoint(newPredictedPoint);
        }
    }, [predictionValues]);

    /**
    * Return the 3D scatter plot with the cluster data and predicted point.
    */
    return (
        <Box sx={styles.box}>
            <Plot
                data={plotData}
                layout={{
                    ...styles.plotLayout,
                    title: {
                        text: isMobile
                            ? 'K-Means Clusters<br>For Air Quality Data'
                            : 'K-Means Clusters For Air Quality Data',
                        font: { size: 24 },
                        x: 0.5,
                        xanchor: 'center',
                    },
                    scene: {
                        ...styles.plotLayout.scene,
                        camera: camera,
                    },
                    legend: {
                        orientation: 'h',
                        y: 0,
                        x: 0.5,
                        xanchor: 'center',
                        font: { size: 16 },
                    },
                    showlegend: !isMobile,
                }}
                onRelayout={(event) => {
                    if (event['scene.camera']) {
                        setCamera(event['scene.camera']);
                    }
                }}
                useResizeHandler={true}
                style={styles.plotStyle}
            />
        </Box>
    );
};

// Styles for the component layout and plot.
const styles = {
    box: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    plotLayout: {
        scene: {
            xaxis: { title: 'CO ppm', autorange: true },
            yaxis: { title: 'NO pphm', autorange: true },
            zaxis: { title: 'PM10 µg/m³', autorange: true },
        },
        autosize: true,
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        margin: {
            l: 10,
            r: 10,
            b: 10,
            t: 80,
        },
    },
    plotStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
};

export default VisualisationKMean;