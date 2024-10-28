import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Plot from 'react-plotly.js';

const App = () => {
  const [healthStats, setHealthStats] = useState([]);
  const [pollutants, setPollutants] = useState({
    co_ppm: '',
    no_pphm: '',
    no2_pphm: '',
    ozone_pphm: '',
    pm10_ug_m3: '',
    so2_pphm: ''
  });
  const [selectedHealthStat, setSelectedHealthStat] = useState(null);
  const [riskLevel, setRiskLevel] = useState('');
  const [healthStatValue, setHealthStatValue] = useState('');
  const [plotData, setPlotData] = useState(null);
  const [selectedPollutant, setSelectedPollutant] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/health_stats')
      .then(response => setHealthStats(response.data.health_stats))
      .catch(error => console.error('Error fetching health stats:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPollutants(prevState => ({ ...prevState, [name]: value }));
  };

  const handleHealthStatChange = (selectedOption) => {
    setSelectedHealthStat(selectedOption);
  };

  const handlePollutantChange = (selectedOption) => {
    setSelectedPollutant(selectedOption);
  };

  useEffect(() => {
    if (selectedHealthStat && Object.values(pollutants).every(value => value !== '')) {
      const inputData = {
        ...pollutants,
        health_stat: selectedHealthStat.value
      };

      axios.post('http://localhost:8000/predict', inputData)
        .then(response => {
          setRiskLevel(response.data.risk_level);
          setHealthStatValue(response.data.health_stat_value);
        })
        .catch(error => console.error('Error predicting risk level:', error));
    }
  }, [pollutants, selectedHealthStat]);

  const fetchPlotData = () => {
    if (selectedHealthStat && selectedPollutant) {
      console.log('Selected Health Stat:', selectedHealthStat.value);
      console.log('Selected Pollutant:', selectedPollutant.value);
      console.log('Pollutants:', pollutants);
      console.log('Health Stat Value:', healthStatValue);
  
      axios.get(`http://localhost:8000/plot_data?health_stat=${selectedHealthStat.value}&pollutant=${selectedPollutant.value}&user_co=${pollutants.co_ppm}&user_no=${pollutants.no_pphm}&user_no2=${pollutants.no2_pphm}&user_ozone=${pollutants.ozone_pphm}&user_pm10=${pollutants.pm10_ug_m3}&user_so2=${pollutants.so2_pphm}&user_health_stat_value=${healthStatValue}`)
        .then(response => {
          const pollutantKey = selectedPollutant.value.toLowerCase().replace(' ', '_').replace('µg/m³', 'ug_m3');
          console.log('Pollutant Key:', pollutantKey);
  
          const userPoint = {
            x: [healthStatValue],
            y: [pollutants[pollutantKey]],
            mode: 'markers',
            marker: {
              color: 'red',
              size: 10,
              symbol: 'x'
            },
            name: 'Your Data Point'
          };
          console.log('User Point:', userPoint);
  
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
      <h1>Health Risk Predictor</h1>
      <div>
        <h2>Input Pollutant Values</h2>
        {['co_ppm', 'no_pphm', 'no2_pphm', 'ozone_pphm', 'pm10_ug_m3', 'so2_pphm'].map(pollutant => (
          <div key={pollutant}>
            <label>{pollutant.replace('_', ' ').toUpperCase()}: </label>
            <input
              type="number"
              name={pollutant}
              value={pollutants[pollutant]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <div>
          <label>Select Health Statistic: </label>
          <Select
            options={healthStats.map(stat => ({ value: stat, label: stat }))}
            onChange={handleHealthStatChange}
          />
        </div>
      </div>
      {riskLevel && (
        <div>
          <h2>Predicted Risk Level: {riskLevel}</h2>
          <h2>Predicted Health Stat Value: {healthStatValue}</h2>
        </div>
      )}
      <div>
        <h2>KNN Scatter Plot</h2>
        <div>
          <label>Select Pollutant for Y-Axis: </label>
          <Select
            options={['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm'].map(pollutant => ({ value: pollutant, label: pollutant }))}
            onChange={handlePollutantChange}
          />
        </div>
        {plotData && (
          <Plot
            data={plotData.data}
            layout={plotData.layout}
          />
        )}
      </div>
    </div>
  );
};

export default App;