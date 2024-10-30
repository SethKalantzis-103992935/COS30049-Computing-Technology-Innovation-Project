// KNNVisualization.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const VisualisationKNN = ({ selectedHealthStat, selectedPollutant }) => {
    const [plotData, setPlotData] = useState(null);

    const fetchPlotData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/plot_data?health_stat=${selectedHealthStat}&pollutant=${selectedPollutant}`);
            setPlotData(response.data);
        } catch (error) {
            console.error('Error fetching plot data:', error);
        }
    };

    useEffect(() => {
        fetchPlotData();
    }, [selectedHealthStat, selectedPollutant]);

    return (
        <div>
            {plotData && (
                <Plot
                    data={plotData.data} // Assuming the response has a data array
                    layout={plotData.layout} // Assuming the response has a layout object
                />
            )}
        </div>
    );
};

export default VisualisationKNN;
