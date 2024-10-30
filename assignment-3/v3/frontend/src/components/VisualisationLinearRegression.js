import React from 'react';
import Plot from 'react-plotly.js';
import { Container, Typography, Box } from '@mui/material';

const VisualisationLinearRegression = ({ recordedData, predictionValues }) => {
    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Health Prediction Results
            </Typography>
            {recordedData && recordedData.health_status.length > 0 ? (
                <Box mt={4}>
                    <Typography variant="h6">
                        Predicted {recordedData.dependent_variable}: {recordedData.health_status[0]}
                    </Typography>
                    <Plot
                        data={[
                            {
                                type: 'scatterpolar',
                                r: [
                                    parseFloat(predictionValues["CO ppm"]),
                                    parseFloat(predictionValues["NO pphm"]),
                                    parseFloat(predictionValues["NO2 pphm"]),
                                    parseFloat(predictionValues["OZONE pphm"]),
                                    parseFloat(predictionValues["PM10 µg/m³"]),
                                    parseFloat(predictionValues["SO2 pphm"])
                                ],
                                theta: ['CO', 'NO', 'NO2', 'Ozone', 'PM10', 'SO2'],
                                fill: 'toself',
                                name: 'Pollutants',
                            }
                        ]}
                        layout={{
                            title: 'Pollutant Levels and Health Status Radar Chart',
                            polar: {
                                radialaxis: {
                                    visible: true,
                                    range: [0, 35] // Adjust the range as needed
                                }
                            },
                            showlegend: true
                        }}
                    />
                </Box>
            ) : (
                <Typography variant="body1">
                    No prediction data available. Please make sure to input the values correctly.
                </Typography>
            )}
        </Container>
    );
};

export default VisualisationLinearRegression;
