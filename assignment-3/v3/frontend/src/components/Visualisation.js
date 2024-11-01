import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
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

const Visualisation = ({ selectedModel, setSelectedModel }) => {

    const [selectedHealthStat, setSelectedHealthStat] = useState(healthStats[0]);
    const [selectedPollutant, setSelectedPollutant] = useState(pollutants[0]);
    const [path, setPath] = useState(linearEndPoint);
    const [clusterData, setClusterData] = useState([]);
    const [knnData, setKnnData] = useState([]);
    const [predictionValues, setPredictionValues] = useState({ ...sliderMidPoints });
    const [predictionResults, setPredictionResults] = useState([]);

    // Fetch initial data to be used in visualisation for KMeans and KNN models
    const fetchInitialClusterData = async () => {
        try {
            const response = await axios.get(kMeanEndPoint);
            setClusterData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch initial data to be used in visualisation for KMeans and KNN models
    const fetchInitialKnnData = async () => {
        try {
            const response = await axios.get(knnEndPoint);
            setKnnData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Call fetchInitialData on component mount
    useEffect(() => {
        fetchInitialClusterData();
        fetchInitialKnnData();
    }, []);




    // Set new selected health stat when dropdown changes
    const handleHealthStatChange = (event) => {
        setSelectedHealthStat(event.target.value);
    };

    // Set new selected pollutant when dropdown changes
    const handlePollutantChange = (event) => {
        setSelectedPollutant(event.target.value);
    };

    // Set new selected model when dropdown changes
    const handleModelChange = (event) => {
        const model = event.target.value;
        setSelectedModel(model);
        switch (model) {
            case mlModels.linear: setPath(linearEndPoint); break;
            case mlModels.kmeans: setPath(kMeanEndPoint); break;
            case mlModels.knn: setPath(knnEndPoint); break;
            default: setPath(linearEndPoint); break;
        }
    };

    // Update prediction values when sliders change
    const handleSliderChange = (name, value) => {
        setPredictionValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };





    // Format data for a POST request. All models expect the same data format for prediction
    const formatDataForPostRequest = () => ({
        CO_ppm: predictionValues["CO ppm"],
        NO_pphm: predictionValues["NO pphm"],
        NO2_pphm: predictionValues["NO2 pphm"],
        OZONE_pphm: predictionValues["OZONE pphm"],
        PM10_ug_m3: predictionValues["PM10 µg/m³"],
        SO2_pphm: predictionValues["SO2 pphm"],
        label: selectedHealthStat
    });

    // Fetch prediction results from API for selected model
    const fetchData = async () => {
        try {
            const response = await axios.post(path, formatDataForPostRequest());
            setPredictionResults(response.data);
        } catch (error) {
            setPredictionResults(error);
        }
    };

    // Call fetchData when any of the following change
    useEffect(() => {
        fetchData();
    }, [path, predictionValues, selectedModel, selectedHealthStat, selectedPollutant]);






    // Filter sliders based on selected model. Only show sliders that are relevant to the selected model
    const visibleSliders = sliderConfig.filter((slider) => {
        if (selectedModel === mlModels.linear) return true;
        if (selectedModel === mlModels.knn) return true;
        if (selectedModel === mlModels.kmeans) return ["CO ppm", "NO pphm", "PM10 µg/m³"].includes(slider.name);
        return false;
    }).map(slider => ({
        ...slider,
        value: predictionValues[slider.name]
    }));






    return (
        <div id='visualisation'>
            <Container>
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


                {/* {<pre>{JSON.stringify(selectedHealthStat, null, 2)}</pre>} */}
                {/* {<pre>{JSON.stringify(predictionValues, null, 2)}</pre>} */}
                {/* {<pre>{JSON.stringify(predictionResults, null, 2)}</pre>} */}
                {/* {<pre>{JSON.stringify(clusterData, null, 2)}</pre>} */}
                {/* {<pre>{JSON.stringify(knnData, null, 2)}</pre>} */}


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
                    predictionValues={predictionValues}
                    predictionResults={predictionResults}
                    selectedHealthStat={selectedHealthStat}
                    selectedPollutant={selectedPollutant}
                    selectedModel={selectedModel}
                />

            </Container>
        </div>
    );
};

const styles = {
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

export default Visualisation;
