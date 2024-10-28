import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, Typography } from '@mui/material';

const KMeansGraph = ({ data, xAxis, yAxis, zAxis, sliderValues, onPredict, predictedValue }) => {
  const clusterColors = ['red', 'green', 'blue', 'purple', 'orange', 'yellow'];
  const clusterScatterData = {};
  const meshData = {};
  const [predictedPoint, setPredictedPoint] = useState(null);
  const [predictedCluster, setPredictedCluster] = useState(null);
  const [clusterStats, setClusterStats] = useState(null);

  useEffect(() => {
    const fetchPredictedCluster = async () => {
      if (sliderValues) {
        const newPredictedPoint = {
          x: sliderValues[xAxis],
          y: sliderValues[yAxis],
          z: sliderValues[zAxis],
        };

        // Wait for the predicted cluster to resolve
        const cluster = await onPredict(sliderValues);
        setPredictedPoint(newPredictedPoint);
        setPredictedCluster(cluster);

        // Assuming you have a way to get the data for the predicted cluster
        const clusterData = data.filter(point => point.cluster === cluster);
        console.log('Cluster Data:', clusterData); // Log the filtered cluster data

        // Here you can compute your statistics based on clusterData
        if (clusterData.length > 0) {
          const mean = clusterData.reduce((acc, curr) => acc + curr[predictedValue], 0) / clusterData.length;
          const min = Math.min(...clusterData.map(point => point[predictedValue]));
          const max = Math.max(...clusterData.map(point => point[predictedValue]));

          // Save stats to state or handle them as needed
          setClusterStats({ mean, min, max });
        }
      }
    };

    fetchPredictedCluster();
  }, [sliderValues, xAxis, yAxis, zAxis, onPredict, data, predictedValue]);


  data.forEach((point) => {
    const cluster = point.cluster;
    const color = clusterColors[cluster];

    if (!clusterScatterData[cluster]) {
      clusterScatterData[cluster] = {
        x: [],
        y: [],
        z: [],
        mode: 'markers',
        marker: {
          size: 4,
          color: color,
        },
        type: 'scatter3d',
        name: `Cluster ${cluster}`,
        showlegend: true,
        legendgroup: `Cluster ${cluster}`,
      };
    }
    clusterScatterData[cluster].x.push(point[xAxis]);
    clusterScatterData[cluster].y.push(point[yAxis]);
    clusterScatterData[cluster].z.push(point[zAxis]);

    if (!meshData[cluster]) {
      meshData[cluster] = {
        x: [],
        y: [],
        z: [],
        color: color,
      };
    }
    meshData[cluster].x.push(point[xAxis]);
    meshData[cluster].y.push(point[yAxis]);
    meshData[cluster].z.push(point[zAxis]);
  });

  const meshDataList = Object.keys(meshData).map((cluster) => ({
    x: meshData[cluster].x,
    y: meshData[cluster].y,
    z: meshData[cluster].z,
    alphahull: 0,
    opacity: 0.15,
    color: meshData[cluster].color,
    type: 'mesh3d',
    showlegend: false,
  }));

  return (
    <div>
      <Plot
        data={[
          ...Object.values(clusterScatterData),
          ...meshDataList,
          predictedPoint ? {
            x: [predictedPoint.x],
            y: [predictedPoint.y],
            z: [predictedPoint.z],
            mode: 'markers',
            marker: {
              size: 10,
              color: 'black',
              symbol: 'cross',
            },
            type: 'scatter3d',
            name: 'Predicted Point',
            showlegend: true,
          } : null,
        ].filter(Boolean)}
        layout={{
          title: 'K-Means Clusters For Air Quality Data',
          scene: {
            xaxis: { title: xAxis },
            yaxis: { title: yAxis },
            zaxis: { title: zAxis },
          },
          autosize: true,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: {
            family: 'Arial, sans-serif',
            size: 12,
            color: '#ffffff',
          },
          scene: {
            xaxis: {
              title: xAxis,
              titlefont: { color: '#ffffff' },
              tickfont: { color: '#ffffff' },
              gridcolor: '#444444',
              zerolinecolor: '#444444',
              linecolor: '#444444',
            },
            yaxis: {
              title: yAxis,
              titlefont: { color: '#ffffff' },
              tickfont: { color: '#ffffff' },
              gridcolor: '#444444',
              zerolinecolor: '#444444',
              linecolor: '#444444',
            },
            zaxis: {
              title: zAxis,
              titlefont: { color: '#ffffff' },
              tickfont: { color: '#ffffff' },
              gridcolor: '#444444',
              zerolinecolor: '#444444',
              linecolor: '#444444',
            },
          },
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />

      {clusterStats && (
        <div>
          <p>Mean: {clusterStats.mean}</p>
          <p>Min: {clusterStats.min}</p>
          <p>Max: {clusterStats.max}</p>
        </div>
      )}

    </div>
  );
};

export default KMeansGraph;
