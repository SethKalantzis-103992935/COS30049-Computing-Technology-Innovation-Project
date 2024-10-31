import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const VisualisationKNN = ({ selectedHealthStat, knnData, predictionResults }) => {
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        // Check if knnData is defined and has elements
        if (!knnData || knnData.length === 0) {
            setPlotData([]);
            return;
        }

        // Process data for the plot
        const dataByRiskLevel = knnData.reduce((acc, dataPoint) => {
            const riskLevel = dataPoint.risk_level;
            if (!acc[riskLevel]) {
                acc[riskLevel] = { x: [], y: [], mode: 'markers', type: 'scatter', name: riskLevel };
            }
            acc[riskLevel].y.push(dataPoint.pollution_score);
            acc[riskLevel].x.push(dataPoint[selectedHealthStat]);
            return acc;
        }, {});

        // Convert to array format expected by Plotly
        const plotDataArray = Object.values(dataByRiskLevel).map((trace, idx) => ({
            ...trace,
            marker: {
                color: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'][idx % 5],
                size: 8,
                opacity: 0.7
            }
        }));

        // Add predicted results to the plot
        if (predictionResults && predictionResults.health_status && predictionResults.dependent_variable) {
            const predictedHealthStat = predictionResults.health_status[0];
            const predictedPollutionScore = predictionResults.dependent_variable[0];

            console.log("Predicted Health Stat:", predictedHealthStat);
            console.log("Predicted Pollution Score:", predictedPollutionScore);

            // Add a trace for the predicted results
            const getColorForPrediction = (score) => {
                if (score <= 0.2) return 'green';
                if (score <= 0.4) return 'blue';
                if (score <= 0.6) return 'orange';
                if (score <= 0.8) return 'red';
                return 'darkred';
            };

            const predictedTrace = {
                x: [predictedHealthStat],
                y: [predictedPollutionScore],
                mode: 'markers',
                type: 'scatter',
                name: 'Predicted Result',
                marker: {
                    color: getColorForPrediction(predictedPollutionScore),
                    size: 12,
                    symbol: 'x'
                }
            };

            plotDataArray.push(predictedTrace);
        }

        setPlotData(plotDataArray);
    }, [selectedHealthStat, knnData, predictionResults]);

    // Define risk levels with corresponding y-axis ranges and colors
    const riskLevels = [
        { level: 'Low', range: [0, 0.2], color: 'rgba(50, 205, 50, 0.4)' },           // Light green
        { level: 'Low-Medium', range: [0.2, 0.4], color: 'rgba(173, 216, 230, 0.4)' }, // Light blue
        { level: 'Medium', range: [0.4, 0.6], color: 'rgba(255, 255, 0, 0.4)' },       // Light yellow
        { level: 'Medium-High', range: [0.6, 0.8], color: 'rgba(255, 165, 0, 0.4)' },  // Light orange
        { level: 'High', range: [0.8, 1], color: 'rgba(255, 99, 71, 0.4)' }            // Light red
    ];

    // Define the background shapes for each risk level
    const backgroundShapes = riskLevels.map((risk) => ({
        type: 'rect',
        xref: 'paper',
        yref: 'y',
        x0: 0,
        x1: 1,
        y0: risk.range[0],
        y1: risk.range[1],
        fillcolor: risk.color,
        opacity: 0.3,
        line: { width: 0 }
    }));

    return (
        <div>
            <Plot
                data={plotData}
                layout={{
                    title: `${selectedHealthStat} vs Pollution Score`,
                    xaxis: { title: selectedHealthStat },
                    yaxis: { title: 'Pollution Score', range: [0, 1] },
                    shapes: backgroundShapes,
                    showlegend: true,
                    height: 600,
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
                }}
                style={{ width: '100%', height: '100%' }}
                useResizeHandler
            />
        </div>
    );
};

export default VisualisationKNN;
