import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const VisualisationKNN = ({ selectedHealthStat, predictionValues, selectedPollutant }) => {
  const [riskLevel, setRiskLevel] = useState('');
  const [healthStatValue, setHealthStatValue] = useState('');
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    if (selectedHealthStat && Object.values(predictionValues).every(value => value !== '')) {
      const inputData = {
        ...predictionValues,
        label: selectedHealthStat.value
      };

      axios.post('http://localhost:8000/knn-model', inputData)
        .then(response => {
          setRiskLevel(response.data.risk_level);
          setHealthStatValue(response.data.health_stat_value);
        })
        .catch(error => console.error('Error predicting risk level:', error));
    }
  }, [predictionValues, selectedHealthStat]);

  const fetchPlotData = () => {
    if (selectedHealthStat && selectedPollutant && selectedPollutant.value) {
      const pollutantKey = selectedPollutant.value.toLowerCase().replace(' ', '_').replace('µg/m³', 'ug_m3');
      console.log('Pollutant Key:', pollutantKey);
  
      axios.get(`http://localhost:8000/knn-model?health_stat=${selectedHealthStat.value}&pollutant=${selectedPollutant.value}&user_co=${predictionValues.co_ppm}&user_no=${predictionValues.no_pphm}&user_no2=${predictionValues.no2_pphm}&user_ozone=${predictionValues.ozone_pphm}&user_pm10=${predictionValues.pm10_ug_m3}&user_so2=${predictionValues.so2_pphm}&user_health_stat_value=${healthStatValue}`)
        .then(response => {
          const userPoint = {
            x: [healthStatValue],
            y: [predictionValues[pollutantKey]],
            mode: 'markers',
            marker: {
              color: 'red',
              size: 10,
              symbol: 'x'
            },
            name: 'Your Data Point'
          };
  
          setPlotData({
            ...response.data,
            data: [...response.data.data, userPoint]
          });
        })
        .catch(error => console.error('Error fetching plot data:', error));
    }
  };
  

  useEffect(() => {
    fetchPlotData();
  }, [selectedHealthStat, selectedPollutant, healthStatValue]);

  return (
    <div>
      {plotData && (
        <Plot
          data={plotData.data}
          layout={plotData.layout}
        />
      )}
    </div>
  );
};

export default VisualisationKNN;
