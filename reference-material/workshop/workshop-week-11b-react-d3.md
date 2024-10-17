# Week 11 - React D3 Demo: Setup and Code Explanation

# Part B of Week 11:

This guide will walk you through setting up and understanding the React D3 demo project, which showcases various types of interactive D3 charts within a React application.

## Project Setup

Create a new React project:
```
npx create-react-app react-d3-demo
cd react-d3-demo
```

Install necessary dependencies:
```
npm install d3
```

Replace the contents of `src/App.js` from demo, create a new file `src/D3Chart.js`, and add a `barChartData.json` file in the `public/data/` directory with the provided content.

## File Structure

- `src/App.js`: Main application component
- `src/D3Chart.js`: Reusable D3 chart component
- `public/data/barChartData.json`: Data for the bar chart

## Code Explanation

### App.js

```javascript
import React, { useState } from 'react';
import D3Chart from './D3Chart';
import './App.css';

function App() {
  const [chartType, setChartType] = useState('sunburst');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Advanced Interactive D3 Charts in React</h1>
        <select 
          value={chartType} 
          onChange={(e) => setChartType(e.target.value)}
          className="chart-selector"
        >
          <option value="multiline">Multi-dimensional Line Chart</option>
          <option value="interactive-pie">Interactive Pie Chart</option>
          <option value="sunburst">Zoomable Sunburst</option>
          <option value="bar">Bar Chart (Fetch Data from the file) </option>
        </select>
        <div className="chart-container">
          <D3Chart type={chartType} />
        </div>
      </header>
    </div>
  );
}

export default App;
```

This component:
- Uses the `useState` hook to manage the selected chart type.
- Renders a dropdown menu to select different chart types.
- Passes the selected chart type to the `D3Chart` component.

### D3Chart.js

This file contains the main logic for rendering different types of D3 charts. Let's break it down:

1. Imports and initial setup:
   ```javascript
   import React, { useRef, useEffect, useState } from 'react';
   import * as d3 from 'd3';
   ```
   - We import necessary hooks from React and the entire D3 library.

2. Component definition and state management:
   ```javascript
   const D3Chart = ({ type }) => {
     const chartRef = useRef();
     const [data, setData] = useState([]);
     const [fileData, setFileData] = useState(null);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState(null);
     const [dimensions, setDimensions] = useState(['x', 'y']);
   ```
   - We define states for chart data, dimensions, loading state, and errors.

3. Data fetching for bar chart:
   ```javascript
   useEffect(() => {
     if (type === 'bar') {
       setIsLoading(true);
       setError(null);
       fetch('/data/barChartData.json')
         .then(response => {
           if (!response.ok) {
             throw new Error('Network response was not ok');
           }
           return response.json();
         })
         .then(data => {
           setFileData(data);
           setIsLoading(false);
         })
         .catch(error => {
           console.error('Error loading the bar chart data:', error);
           setError(error.message);
           setIsLoading(false);
         });
     }
   }, [type]);
   ```
   - This effect hook fetches data for the bar chart when the chart type is 'bar'.

4. Main chart rendering logic:
   ```javascript
   useEffect(() => {
     // Clear previous chart
     d3.select(chartRef.current).selectAll('*').remove();
   
     const container = d3.select(chartRef.current);
     const width = container.node().getBoundingClientRect().width;
     const height = container.node().getBoundingClientRect().height;
   
     const svg = container.append('svg')
       .attr('width', '100%')
       .attr('height', '100%')
       .attr('viewBox', `0 0 ${width} ${height}`)
       .style('font', '10px sans-serif');
   
     switch(type) {
       case 'multiline':
         drawMultiLineChart(svg, width, height);
         break;
       case 'interactive-pie':
         drawInteractivePieChart(svg, width, height);
         break;
       case 'sunburst':
         drawZoomableSunburst(svg, width, height);
         break;
       case 'bar':
         if (fileData) {
           drawBarChart(svg, width, height);
         }
         break;
       default:
         break;
     }
   }, [type, data, dimensions]);
   ```
   - This effect hook is responsible for rendering the selected chart type.
   - It clears any existing chart, sets up the SVG container, and calls the appropriate drawing function based on the chart type.

5. Individual chart drawing functions:
   - `drawBarChart`: Renders a bar chart using data fetched from a file.
   - `drawMultiLineChart`: Renders a multi-dimensional line chart with selectable dimensions.
   - `drawInteractivePieChart`: Renders an interactive pie chart with hover effects.
   - `drawZoomableSunburst`: Renders a zoomable sunburst chart.

Each of these functions uses D3.js to create the respective chart types, setting up scales, axes, and interactive elements as needed.

## Running the Application

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Use the dropdown menu to switch between different chart types.

## Customization

You can customize this application by:
- Adding new chart types in the `D3Chart` component.
- Modifying the existing chart drawing functions to change their appearance or behavior.
- Adding more data sources or changing the existing data structure.

## Troubleshooting

If you encounter any issues:
- Ensure all dependencies are correctly installed.
- Check the browser console for any error messages.
- Verify that the `barChartData.json` file is correctly placed in the `public/data/` directory.

Enjoy exploring and customizing your React D3 demo!
