import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RiskLevelBar from './RiskLevelBar'; // Import the new component

const PollutantForm = () => {
  const [pollutants, setPollutants] = useState({
    co_ppm: '',
    no_pphm: '',
    no2_pphm: '',
    ozone_pphm: '',
    pm10_ug_m3: '',
    so2_pphm: ''
  });

  const [healthStats, setHealthStats] = useState([]);
  const [selectedStat, setSelectedStat] = useState('');
  const [riskLevel, setRiskLevel] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchHealthStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/health_stats');
        setHealthStats(response.data.health_stats);
      } catch (error) {
        console.error('Error fetching health stats:', error);
      }
    };
  
    fetchHealthStats();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPollutants({ ...pollutants, [name]: value });
  };

  const validateForm = () => {
    // Check if all pollutant values and selected health stat are filled
    return Object.values(pollutants).every(value => value !== '') && selectedStat !== '';
  };

  useEffect(() => {
    // Trigger the API call only when all form fields are filled
    if (validateForm()) {
      const fetchRiskLevel = async () => {
        try {
          const response = await axios.post('http://localhost:8000/predict', {
            ...pollutants,
            health_stat: selectedStat
          });
          setRiskLevel(response.data.risk_level);
          setDataPoints([...dataPoints, pollutants]);
          setFormError(''); // Clear error if API call succeeds
        } catch (error) {
          console.error('Error during submission:', error);
          if (error.response) {
            console.error('Validation Error:', error.response.data);
          }
        }
      };

      fetchRiskLevel();
    } else {
      setRiskLevel(null); // Clear the risk level when form is incomplete
    }
  }, [pollutants, selectedStat]); // Re-run when pollutants or selectedStat changes

  return (
    <div>
      {Object.keys(pollutants).map((key) => (
        <div key={key}>
          <label>
            {key.replace(/_/g, ' ')}:
            <input
              step={0.01}
              type="number"
              name={key}
              value={pollutants[key]}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
      ))}
      <div>
        <label>
          Health Statistic:
          <select value={selectedStat} onChange={(e) => setSelectedStat(e.target.value)} required>
            <option value="">Select a health stat</option>
            {healthStats.map((stat) => (
              <option key={stat} value={stat}>{stat}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Display error message if form is incomplete */}
      {formError && <p style={{ color: 'red' }}>{formError}</p>}

      {/* Display the risk level and risk bar if available */}
      {riskLevel && <RiskLevelBar riskLevel={riskLevel} />}
    </div>
  );
};

export default PollutantForm;