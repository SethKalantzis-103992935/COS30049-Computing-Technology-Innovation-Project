/**
 * VisualisationContainer.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 17, 2024.
 * Last Modified: November 2, 2024.
 * 
 * Purpose:
 * This component serves as a container for various machine learning model visualizations. It 
 * includes sliders for pollutant levels, dropdowns for model selection, and displays results based 
 * on user input. The component fetches initial data for K-Means and KNN models and updates 
 * visualizations based on selected options.
 * 
 * Usage:
 * This component should be included in a parent component, providing props for the selected model 
 * and a function to update the selected model. It manages state for health statistics, pollutants, 
 * prediction values, and fetched data for the visualizations.
 * 
 * Note: 
 * The component is wrapped in a div with the id 'visualisation' to facilitate routing to the 
 * component. By default, react-router-dom doesn't link to a component when navigating to a
 * new route, so this is a workaround to ensure the user can navigate to the visualisation 
 * section of the page.
 */

import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import SliderContainer from './SliderContainer';
import DropDownContainer from './DropDownContainer';
import StatsBox from './StatsBox';
import VisualisationKNN from './VisualisationKNN';
import VisualisationLinearRegression from './VisualisationLinearRegression';
import VisualisationKMean from './VisualisationKMean';
import { pollutants, healthStats } from '../constants/DataNames';
import { linearEndPoint, kMeanEndPoint, knnEndPoint } from '../constants/Endpoints';
import { sliderConfig, sliderMidPoints } from '../constants/SliderConfig';
import { mlModels } from '../constants/MLModels';

// VisualisationContainer component
const VisualisationContainer = ({ selectedModel, setSelectedModel }) => {

    const [selectedHealthStat, setSelectedHealthStat] = useState(healthStats[0]);
    const [selectedPollutant, setSelectedPollutant] = useState(pollutants[0]);
    const [path, setPath] = useState(linearEndPoint);
    const [clusterData, setClusterData] = useState([]);
    const [knnData, setKnnData] = useState([]);
    const [predictionValues, setPredictionValues] = useState({ ...sliderMidPoints });
    const [predictionResults, setPredictionResults] = useState([]);

    /**
    * Formats the data to ensure the POST request body contains exactly what is expected by the
    * endpoints. Returns an object containing pollutant levels and the selected health statistic.
    */
    const formatDataForPostRequest = () => ({
        CO_ppm: predictionValues["CO ppm"],
        NO_pphm: predictionValues["NO pphm"],
        NO2_pphm: predictionValues["NO2 pphm"],
        OZONE_pphm: predictionValues["OZONE pphm"],
        PM10_ug_m3: predictionValues["PM10 µg/m³"],
        SO2_pphm: predictionValues["SO2 pphm"],
        label: selectedHealthStat
    });

    /**
     * Fetches initial cluster data for K-Means from the API.
     * The data is stored in the clusterData state.
     */
    const fetchInitialClusterData = async () => {
        try {
            const response = await axios.get(kMeanEndPoint);
            setClusterData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Fetches initial KNN data from the API.
     * The data is stored in the knnData state.
     */
    const fetchInitialKnnData = async () => {
        try {
            const response = await axios.get(knnEndPoint);
            setKnnData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    /**
    * Fetches prediction data from the API based on the selected model and input values.
    * The results are stored in the predictionResults state.
    */
    const fetchData = async () => {
        try {
            const response = await axios.post(path, formatDataForPostRequest());
            setPredictionResults(response.data);
        } catch (error) {
            setPredictionResults(error);
        }
    };

    /**
     * Handles the change in selected health statistics.
     * Updates the selectedHealthStat state based on user selection.
     */
    const handleHealthStatChange = (event) => {
        setSelectedHealthStat(event.target.value);
    };

    /**
     * Handles the change in selected pollutants.
     * Updates the selectedPollutant state based on user selection.
     */
    const handlePollutantChange = (event) => {
        setSelectedPollutant(event.target.value);
    };

    /**
     * Handles the change in selected machine learning model.
     * Updates the selectedModel state and sets the appropriate API endpoint path.
     */
    const handleModelChange = (event) => {
        const model = event.target.value;
        setSelectedModel(model);
        switch (model) {
            case mlModels.linear: 
                setPath(linearEndPoint); 
                break;
            case mlModels.kmeans: 
                setPath(kMeanEndPoint); 
                break;
            case mlModels.knn: 
                setPath(knnEndPoint); 
                break;
            default: 
                setPath(linearEndPoint); 
                break;
        }
    };

    /**
     * Handles changes in slider values for pollutant levels.
     * Updates the predictionValues state with the new slider value.
     */
    const handleSliderChange = (name, value) => {
        setPredictionValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    /**
    * Determines which sliders should be visible based on the selected model.
    * The KMean Model uses PCA to reduce the number of features, so only certain sliders are
    * visible for this model.
    */
    const visibleSliders = sliderConfig.filter((slider) => {
        if (selectedModel === mlModels.kmeans) {
            return ["CO ppm", "NO pphm", "PM10 µg/m³"].includes(slider.name);
        }
        return true;
    }).map(slider => ({
        ...slider,
        value: predictionValues[slider.name]
    }));
    
    /**
     * Updates the API endpoint path based on the selected model.
     * This effect runs whenever the selected model changes.
     */
    useEffect(() => {
        switch (selectedModel) {
            case mlModels.linear:
                setPath(linearEndPoint);
                break;
            case mlModels.kmeans:
                setPath(kMeanEndPoint);
                break;
            case mlModels.knn:
                setPath(knnEndPoint);
                break;
            default:
                setPath(linearEndPoint);
                break;
        }
    }, [selectedModel]);

    /**
    * Fetches initial data for the selected model from the API when the component mounts.
    */
    useEffect(() => {
        fetchInitialClusterData();
        fetchInitialKnnData();
        fetchData();
    }, []);

    /**
     * Fetches data from the API whenever the path, prediction values, selected model, health 
     * statistic, or selected pollutant changes.
     */
    useEffect(() => {
        fetchData();
    }, [path, predictionValues, selectedModel, selectedHealthStat, selectedPollutant]);


    return (
        <div id='visualisation'>
            <Container>
                <Typography variant='h2' sx={styles.title}>
                    Model Visualisation
                </Typography>
                <DropDownContainer
                    models={[mlModels.linear, mlModels.kmeans, mlModels.knn]}
                    selectedModel={selectedModel}
                    onModelChange={handleModelChange}
                    healthStats={healthStats}
                    selectedHealthStat={selectedHealthStat}
                    onHealthStatChange={handleHealthStatChange}
                    pollutants={pollutants}
                    selectedPollutant={selectedPollutant}
                    onPollutantChange={handlePollutantChange}
                />
                <Container style={styles.graphContainer} >
                    {selectedModel === mlModels.linear && (
                        <VisualisationLinearRegression
                            predictionValues={predictionValues}
                        />
                    )}
                    {selectedModel === mlModels.kmeans && (
                        <VisualisationKMean
                            predictionResults={predictionResults}
                            predictionValues={predictionValues}
                            clusterData={clusterData}
                        />
                    )}
                    {selectedModel === mlModels.knn && (
                        <VisualisationKNN
                            selectedHealthStat={selectedHealthStat}
                            knnData={knnData}
                            predictionResults={predictionResults}
                        />
                    )}
                </Container>
                <SliderContainer
                    sliders={visibleSliders}
                    onSliderChange={handleSliderChange}
                    color='primary'
                />
                <StatsBox
                    predictionResults={predictionResults}
                    selectedHealthStat={selectedHealthStat}
                    selectedModel={selectedModel}
                />
            </Container>
        </div>
    );
};

// Styles for the VisualisationContainer component
const styles = {
    title: {
        marginBottom: '40px',
        textAlign: 'center'
    },
    graphContainer: {
        width: '100%',
        minHeight: '50vh',
        height: '600px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginTop: '20px',
        marginBottom: '40px',
    },
};

export default VisualisationContainer;
