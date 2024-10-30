import React from 'react';
import Plot from 'react-plotly.js';
import { Container, Typography, Box } from '@mui/material';

const VisualisationLinearRegression = ({ selectedHealthStat, predictionResults, predictionValues }) => {
    return (
        <Box sx={styles.box}>
            {predictionResults && predictionResults.health_status && predictionResults.health_status.length > 0 ? (
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
                            marker: {
                                color: '#71b5bc'
                            }
                        }
                    ]}
                    layout={styles.plotLayout}
                    useResizeHandler={true}
                    style={styles.plot}
                />
            ) : (
                <Typography variant="body1">
                    No prediction data available. Please make sure to input the values correctly.
                </Typography>
            )}
        </Box>
    );
};

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
    plotLayout: {
        title: 'Pollutant Levels and Health Status Radar Chart',
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 35]
            }
        },
        showlegend: true,
        autosize: true,
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)'
    }
};

export default VisualisationLinearRegression;
