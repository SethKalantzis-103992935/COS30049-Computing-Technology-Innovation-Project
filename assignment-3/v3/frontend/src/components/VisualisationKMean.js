import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const VisualisationKMean = ({ predictionResults, predictionValues, clusterData }) => {
    const theme = useTheme();
    const [predictedPoint, setPredictedPoint] = useState(null);
    const [camera, setCamera] = useState({
        eye: { x: 1.8, y: 1.8, z: 1 },
        up: { x: 0, y: 0, z: 1 },
        center: { x: 0, y: 0, z: -0.2 }
    });
    
    const clusterColors = [
        theme.palette.graph.pinkPoint,
        theme.palette.graph.orangePoint,
        theme.palette.graph.bluePoint,
        theme.palette.graph.purplePoint,
        theme.palette.graph.redPoint,
        theme.palette.graph.greenPoint
    ];
    const clusterScatterData = {};
    const meshData = {};
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

    const getPredictedPointColor = () => {
        if (predictionResults && predictionResults.predicted_cluster !== undefined) {
            const clusterIndex = predictionResults.predicted_cluster;
            return clusterColors[clusterIndex % clusterColors.length];
        }
        return theme.palette.graph.blackDefault;
    };

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
                    size: 3,
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

    const plotData = [
        // Data traces for the clusters
        ...Object.values(clusterScatterData).map(trace => ({
            ...trace,
            marker: {
                ...trace.marker,
                size: 3, // Keep the original size for the plot markers
            },
            showlegend: false, // Show the trace in the legend
        })),
        // Create a separate dummy trace for the legend markers
        ...Object.values(clusterScatterData).map(trace => ({
            x: [null], // Dummy data point
            y: [null],
            z: [null],
            mode: 'markers',
            marker: {
                size: 8, // Larger size for the legend markers
                color: trace.marker.color, // Use the same color as the cluster
            },
            type: 'scatter3d',
            name: trace.name, // Keep the name for the legend
            showlegend: true, // Show this trace in the legend
            hoverinfo: 'none', // Disable hover information
            legendgroup: trace.name, // Group the legend items
        })),
        ...meshDataList,
        predictedPoint && {
            x: [predictedPoint.x],
            y: [predictedPoint.y],
            z: [predictedPoint.z],
            mode: 'markers',
            marker: {
                color: getPredictedPointColor(),
                line: { color: 'black', width: 2 },
                size: 3, // Keep the original size for the predicted point marker
                symbol: 'x',
            },
            type: 'scatter3d',
            name: 'Predicted Point',
            showlegend: false, // Hide the predicted point from the legend
        },
    ].filter(Boolean);
    
    
    

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
