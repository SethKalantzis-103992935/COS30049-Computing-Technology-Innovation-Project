import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@mui/material';

const VisualisationKMean = ({ predictionResults, predictionValues, clusterData }) => {
    const [predictedPoint, setPredictedPoint] = useState(null);
    const clusterColors = ['#ea698b', '#6a994e', '#457b9d', '#6f2dbd', '#ee9b00', '#c1121f'];
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
        <Box sx={styles.box}>
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
                layout={styles.plotLayout}
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
        title: 'K-Means Clusters For Air Quality Data',
        scene: {
            xaxis: { title: 'CO ppm' },
            yaxis: { title: 'NO pphm' },
            zaxis: { title: 'PM10 µg/m³' },
        },
        autosize: true,
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)'
    },
    plotStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
};

export default VisualisationKMean;
