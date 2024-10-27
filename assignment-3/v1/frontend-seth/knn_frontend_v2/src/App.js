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

  const handleSubmit = () => {
    const inputData = {
      ...pollutants,
      health_stat: selectedHealthStat.value
    };

    axios.post('http://localhost:8000/predict', inputData)
      .then(response => setRiskLevel(response.data.risk_level))
      .catch(error => console.error('Error predicting risk level:', error));
  };

  const fetchPlotData = () => {
    if (selectedHealthStat && selectedPollutant) {
      axios.get(`http://localhost:8000/plot_data?health_stat=${selectedHealthStat.value}&pollutant=${selectedPollutant.value}`)
        .then(response => setPlotData(response.data))
        .catch(error => console.error('Error fetching plot data:', error));
    }
  };

  useEffect(() => {
    fetchPlotData();
  }, [selectedHealthStat, selectedPollutant]);

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
        <button onClick={handleSubmit}>Predict Risk Level</button>
      </div>
      {riskLevel && (
        <div>
          <h2>Predicted Risk Level: {riskLevel}</h2>
        </div>
      )}
      <div>
        <h2>Decision Boundary Plot</h2>
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