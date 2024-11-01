import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { displayNames } from '../constants/DisplayNames';

const VisualisationKNN = ({ selectedHealthStat, knnData, predictionResults }) => {
    const [plotData, setPlotData] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const displayName = displayNames[selectedHealthStat] || selectedHealthStat;

    // Define explicit color mapping for each risk level
    const riskLevels = [
        { level: 'Low', range: [0, 0.2], color: theme.palette.graph.greenPoint },
        { level: 'Low-Medium', range: [0.2, 0.4], color: theme.palette.graph.bluePoint },
        { level: 'Medium', range: [0.4, 0.6], color: theme.palette.graph.yellowPoint },
        { level: 'Medium-High', range: [0.6, 0.8], color: theme.palette.graph.orangePoint },
        { level: 'High', range: [0.8, 1], color: theme.palette.graph.redPoint }
    ];

    const getColorForPrediction = (score) => {
        if (score <= 0.2) return theme.palette.graph.greenPoint;
        if (score <= 0.4) return theme.palette.graph.bluePoint;
        if (score <= 0.6) return theme.palette.graph.orangePoint;
        if (score <= 0.8) return theme.palette.graph.redPoint;
        return theme.palette.graph.darkRedPoint;
    };

    useEffect(() => {
        if (!knnData || knnData.length === 0) {
            setPlotData([]);
            return;
        }

        // Group data by risk level and assign colors directly based on riskLevels
        const dataByRiskLevel = knnData.reduce((acc, dataPoint) => {
            const pollutionScore = dataPoint.pollution_score;
            const riskLevel = dataPoint.risk_level;
            if (!acc[riskLevel]) {
                acc[riskLevel] = {
                    x: [],
                    y: [],
                    mode: 'markers',
                    type: 'scatter',
                    name: riskLevel,
                    marker: {
                        color: getColorForPrediction(pollutionScore),
                        size: 8,
                        opacity: 0.7
                    }
                };
            }
            acc[riskLevel].y.push(dataPoint.pollution_score);
            acc[riskLevel].x.push(dataPoint[selectedHealthStat]);
            return acc;
        }, {});

        const plotDataArray = Object.values(dataByRiskLevel);

        // Add the predicted result if available
        if (predictionResults && predictionResults.health_status && predictionResults.dependent_variable) {
            const predictedHealthStat = predictionResults.health_status[0];
            const predictedPollutionScore = predictionResults.dependent_variable[0];

            const predictedTrace = {
                x: [predictedHealthStat],
                y: [predictedPollutionScore],
                mode: 'markers',
                type: 'scatter',
                name: 'Predicted Result',
                marker: {
                    color: getColorForPrediction(predictedPollutionScore),
                    size: 12,
                    symbol: 'circle',
                    line: { color: 'black', width: 2 },
                    opacity: 1
                },
                showlegend: false
            };

            plotDataArray.push(predictedTrace);
        }

        setPlotData(plotDataArray);
    }, [selectedHealthStat, knnData, predictionResults]);

    // Background shapes for the risk levels
    const backgroundShapes = riskLevels.map((risk) => ({
        type: 'rect',
        xref: 'paper',
        yref: 'y',
        x0: 0,
        x1: 1,
        y0: risk.range[0],
        y1: risk.range[1],
        fillcolor: risk.color,
        opacity: 0.2,
        line: { width: 0 }
    }));

    return (
        <Box sx={styles.box}>
            <Plot
                data={plotData}
                layout={{
                    ...styles.plotLayout,
                    title: {
                        text: isMobile 
                            ? `Pollution Score vs<br>${displayName}`
                            : `Pollution Score vs ${displayName}`,
                        font: { size: 24 },
                        x: 0.5,
                        xanchor: 'center',
                    },
                    xaxis: { title: `${displayName}<br>Rate per 100,000 People` },
                    yaxis: { title: 'Pollution Score', range: [0, 1] },
                    shapes: backgroundShapes,
                    showlegend: true,
                    legend: {
                        orientation: 'h',
                        y: -0.25,
                        x: 0.5,
                        xanchor: 'center',
                        font: { size: 16 }
                    },
                    font: { size: 16 },
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
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
            l: 70,
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

export default VisualisationKNN;
