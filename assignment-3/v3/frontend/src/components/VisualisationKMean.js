import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const VisualisationKMean = ({ predictionResults, predictionValues, clusterData }) => {
    const [predictedPoint, setPredictedPoint] = useState(null);
    const clusterColors = ['#ea698b', '#6a994e', '#457b9d', '#6f2dbd', '#ee9b00', '#c1121f'];
    const clusterScatterData = {};
    const meshData = {};

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        if (predictionValues) {
            setPredictedPoint({
                x: predictionValues['CO ppm'],
                y: predictionValues['NO pphm'],
                z: predictionValues['PM10 µg/m³'],
            });
        }
    }, [predictionValues]);

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

    const plotData = [
        ...Object.values(clusterScatterData),
        ...meshDataList,
        predictedPoint && {
            x: [predictedPoint.x],
            y: [predictedPoint.y],
            z: [predictedPoint.z],
            mode: 'markers',
            marker: {
                color: 'red',
                size: 4,
                symbol: 'x',
            },
            type: 'scatter3d',
            name: 'Predicted Point',
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
                        camera: {
                            eye: { x: isMobile ? 2.8 : 1.5, y: 2.8, z: 2.8 },
                        },
                    },
                    showlegend: !isMobile,
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
            t: 80, // Extra space at the top to accommodate title
        },
    },
    plotStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
};

export default VisualisationKMean;
