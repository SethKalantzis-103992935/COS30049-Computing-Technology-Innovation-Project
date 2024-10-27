import React from 'react';

const RiskLevelBar = ({ riskLevel }) => {
  const riskLevels = {
    'Low Risk': 0,
    'Low-Medium Risk': 1,
    'Medium Risk': 2,
    'Medium-High Risk': 3,
    'High Risk': 4,
  };

  const getRiskPosition = (level) => {
    const position = riskLevels[level] !== undefined ? riskLevels[level] : -1;
    return position * (100 / 4); // 5 levels: 20% intervals
  };

  const dotPosition = getRiskPosition(riskLevel);
  const gradientStyle = {
    height: '30px',
    background: 'linear-gradient(to right, #4CAF50, #FFC107, #F44336)', // Gradient from green to yellow to red
    borderRadius: '5px',
    position: 'relative',
    width: '50%',
  };

  const dotStyle = {
    position: 'absolute',
    top: '50%',
    left: `${dotPosition}%`, // Use backticks for string interpolation
    transform: 'translate(-50%, -50%)',
    width: '10px',
    height: '10px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    border: '2px solid #000', // Optional: border for visibility
    transition: 'left 0.5s ease', // Smooth transition
  };

  return (
    <div style={gradientStyle}>
      <div style={dotStyle} />
    </div>
  );
};

export default RiskLevelBar;