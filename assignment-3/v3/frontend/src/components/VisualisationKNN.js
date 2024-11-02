/**
 * File: VisualisationKNN.js
 * Author: Seth Kalantzis, Henry Richardson, Matthew Cross (Anti-Pesto Party)
 * Created: October 30, 2024
 * Last Modified: November 02, 2024
 * 
 * Purpose: 
 * This component renders a scatter plot to visualize the relationship between pollutant levels and 
 * a selected health statistic based on K-Nearest Neighbors (KNN) data. The component takes 
 * `selectedHealthStat`, `knnData`, and `predictionResults` as props to dynamically update the plot 
 * with relevant data points and predicted values. The scatter plot includes background color bands 
 * representing different risk levels.
 * 
 * Usage:
 * This component is used to display the relationship between pollutant levels and a selected health
 * statistic based on KNN data. It provides a visual representation of how pollution scores are
 * distributed across different health statistics and risk levels.
 */

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { displayNames } from '../constants/DisplayNames';

// VisualisationKNN Component
const VisualisationKNN = ({ selectedHealthStat, knnData, predictionResults }) => {
    
    const [plotData, setPlotData] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const displayName = displayNames[selectedHealthStat] || selectedHealthStat;

    /**
    * Define risk levels based on pollution score ranges, and assign colors to each level.
    */
    const riskLevels = [
        { level: 'Low', range: [0, 0.2], color: theme.palette.graph.greenPoint },
        { level: 'Low-Medium', range: [0.2, 0.4], color: theme.palette.graph.bluePoint },
        { level: 'Medium', range: [0.4, 0.6], color: theme.palette.graph.yellowPoint },
        { level: 'Medium-High', range: [0.6, 0.8], color: theme.palette.graph.orangePoint },
        { level: 'High', range: [0.8, 1], color: theme.palette.graph.redPoint }
    ];

    /**
    * Assign a color to each prediction based on the pollution score.
    * The color is determined by the pollution score's position within the risk level ranges.
    */
    const getColorForPrediction = (score) => {
        if (score <= 0.2) return theme.palette.graph.greenPoint;
        if (score <= 0.4) return theme.palette.graph.bluePoint;
        if (score <= 0.6) return theme.palette.graph.orangePoint;
        if (score <= 0.8) return theme.palette.graph.redPoint;
        return theme.palette.graph.darkRedPoint;
    };

    /**
    * Clamp the pollution score to a maximum of 1 to ensure it stays within valid range.
    */
    const clampPollutionScore = (score) => Math.min(score, 1);

    /**
    * Update the plot data based on the selected health statistic, KNN data, and prediction results.
    * Triggered when the selected health statistic, KNN data, or prediction results change.
    */
    useEffect(() => {

        // Return if no KNN data is available
        if (!knnData || knnData.length === 0) {
            setPlotData([]);
            return;
        }

        // Group data points by risk level
        const dataByRiskLevel = knnData.reduce((acc, dataPoint) => {
            const pollutionScore = clampPollutionScore(dataPoint.pollution_score);
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
            acc[riskLevel].y.push(pollutionScore);
            acc[riskLevel].x.push(dataPoint[selectedHealthStat]);
            return acc;
        }, {});

        // Convert grouped data to an array of traces
        const plotDataArray = Object.values(dataByRiskLevel);

        // Add predicted result as a separate trace, if available
        if (
            predictionResults && 
            predictionResults.health_status && 
            predictionResults.pollution_score
        ) {
            const predictedHealthStat = predictionResults.health_status[0];
            const predictedPollutionScore = clampPollutionScore(predictionResults.pollution_score[0]);
            const predictedRiskLevel = riskLevels.find(
                risk => predictedPollutionScore >= risk.range[0] && 
                predictedPollutionScore <= risk.range[1]
            ).level;

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
                showlegend: false,
                hoverinfo: 'text',
                text: 
                    `${predictedRiskLevel}<br>
                    (${predictedHealthStat.toFixed(3)}, ${predictedPollutionScore.toFixed(3)})`
            };

            // Add predicted trace to the plot data array
            plotDataArray.push(predictedTrace);
        }

        setPlotData(plotDataArray);
    }, [selectedHealthStat, knnData, predictionResults]);

    // Define background shapes for risk levels
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

    /**
    * Return the scatter plot with pollution scores and health statistics based on KNN data.
    */
    return (
        <Box sx={styles.box}>
            <Plot
                data={plotData}
                layout={{
                    title: {
                        text: isMobile 
                            ? `Pollution Score vs<br>${displayName}`
                            : `Pollution Score vs ${displayName}`,
                        font: { size: isMobile ? 18 : 24 },
                        x: 0.5,
                        xanchor: 'center',
                    },
                    xaxis: { 
                        title: {
                            text: isMobile
                                ? `${displayName}<br>Rate per 100,000 People` 
                                : `${displayName} Rate per 100,000 People`,
                            font: { size: 16 }
                        }
                    },
                    yaxis: { 
                        range: [0, 1],
                        title: {
                            text: 'Pollution Score',  
                            font: { size: 16 },
                            standoff: isMobile ? 10 : 0
                        }
                    },
                    shapes: backgroundShapes,
                    showlegend: !isMobile,
                    legend: {
                        orientation: 'h',
                        y: -0.25,
                        x: 0.5,
                        xanchor: 'center',
                        font: { size: isMobile ? 12 : 16 }
                    },
                    font: { size: 16 },
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
                    margin: {
                        l: isMobile ? 60 : 70,
                        r: 10,
                        b: isMobile ? 100 : 10,
                        t: isMobile ? 100 : 80,
                    }
                }}
                useResizeHandler={true}
                style={styles.plotStyle}
            />
        </Box>
    );
};

// Style object defining component box and plot layout
const styles = {
    box: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    plotStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
};

export default VisualisationKNN;
