/**
 * VisualisationLinearRegression.js
 * 
 * Author: Henry Richardson, Matthew Cross (Anti-Pesto Party)
 * Created: October 16, 2024
 * Last Modified: November 02, 2024
 * 
 * Purpose:
 * This component visualizes pollutant levels and their health impacts using a radar chart. It takes 
 * prediction values as props, normalizes them against defined slider limits, and displays them in a 
 * radar plot to provide a visual representation of air quality.
 * 
 * Usage: 
 * This component is used to display the levels of various pollutants in a radar chart format,
 * providing an intuitive visual representation of how pollutant levels compare to health impact.
 */

import React from 'react';
import Plot from 'react-plotly.js';
import { Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { sliderConfig } from '../constants/SliderConfig';

// VisualisationLinearRegression Component
const VisualisationLinearRegression = ({ predictionValues }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    /**
     * Normalize the prediction values against the slider limits to ensure the radar chart is
     * consistent and visually appealing. All individual pollutant values are divided by their
     * respective maximum slider values to ensure they are within the range [0, 1].
     * 
     * The first and last values are repeated to close the shape of the radar chart.
     */
    const normalizedValues = predictionValues
        ? [
            predictionValues["CO ppm"] / sliderConfig.find(s => s.name === "CO ppm").max,
            predictionValues["NO pphm"] / sliderConfig.find(s => s.name === "NO pphm").max,
            predictionValues["NO2 pphm"] / sliderConfig.find(s => s.name === "NO2 pphm").max,
            predictionValues["OZONE pphm"] / sliderConfig.find(s => s.name === "OZONE pphm").max,
            predictionValues["PM10 µg/m³"] / sliderConfig.find(s => s.name === "PM10 µg/m³").max,
            predictionValues["SO2 pphm"] / sliderConfig.find(s => s.name === "SO2 pphm").max,
            predictionValues["CO ppm"] / sliderConfig.find(s => s.name === "CO ppm").max,
        ]
        : [];

    /** 
    * If there are less than 7 normalized values, display a message indicating that no prediction
    * data is available. This can occur if the user has not input the values correctly.
    */
    if (normalizedValues.length < 7) {
        return (
            <Box sx={styles.box}>
                <Typography variant="body1">
                    No prediction data available. Please make sure to input the values correctly.
                </Typography>
            </Box>
        );
    }

    /**
    * Return the radar chart with the normalized values displayed as a filled polygon.
    */
    return (
        <Box sx={styles.box}>
            <Plot
                data={[{
                    type: 'scatterpolar',
                    r: normalizedValues,
                    theta: ['CO', 'NO', 'NO2', 'Ozone', 'PM10', 'SO2', 'CO'],
                    fill: 'toself',
                    name: 'Pollutants',
                    marker: {
                        color: theme.palette.graph.bluePoint
                    }
                }]}
                layout={{
                    title: {
                        text: isMobile 
                            ? 'Pollutant Levels<br>Radar Chart'
                            : 'Pollutant Levels Radar Chart',
                        font: { size: 24 },
                    },
                    polar: {
                        radialaxis: {
                            visible: true,
                            range: [0, 1]
                        }
                    },
                    showlegend: false,
                    autosize: true,
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
                }}
                useResizeHandler={true}
                style={styles.plot}
            />
        </Box>
    );
};

// Styles for the component layout and plot.
const styles = {
    box: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plot: {
        width: '100%',
        height: '100%',
    },
};

export default VisualisationLinearRegression;