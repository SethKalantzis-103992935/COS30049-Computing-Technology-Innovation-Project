import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
import SliderContainer from './SliderContainer';
import DropDownContainer from './DropDownContainer';
import StatsBox from './StatsBox';
import VisualisationKNN from './VisualisationKNN';
import VisualisationLinearRegression from './VisualisationLinearRegression';
import VisualisationKMean from './VisualisationKMean';
import { WidthFull } from '@mui/icons-material';

const Visualisation = () => {

    // API Endpoints
    const linearEndPoint = 'http://127.0.0.1:8000/regression-model';
    const kMeanEndPoint = 'http://127.0.0.1:8000/cluster-model';
    const knnEndPoint = 'http://127.0.0.1:8000/knn-model';

    // Pollutants
    const pollutants = ['CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm'];

    // Health Stats
    const healthStats = ['asthma deaths', 'asthma edp', 'asthma hospitalisations', 'asthma pic',
        'copd deaths', 'copd hospitalisations', 'iap deaths', 'iap hospitalisations'];

    // Slider Configurations
    const sliderConfig = [
        { name: "CO ppm", min: 0, max: 0.35, step: 0.01 },
        { name: "NO pphm", min: 0, max: 3.50, step: 0.01 },
        { name: "NO2 pphm", min: 0, max: 2, step: 0.01 },
        { name: "OZONE pphm", min: 1, max: 2.50, step: 0.01 },
        { name: "PM10 µg/m³", min: 10, max: 35, step: 0.1 },
        { name: "SO2 pphm", min: 0, max: 0.20, step: 0.01 },
    ];



    // States
    const [selectedHealthStat, setSelectedHealthStat] = useState(healthStats[0]);
    const [selectedPollutant, setSelectedPollutant] = useState(pollutants[0]);
    const [selectedModel, setSelectedModel] = useState('linear');
    const [path, setPath] = useState(linearEndPoint);
    const [clusterData, setClusterData] = useState([]);
    const [knnData, setKnnData] = useState([]);
    const [predictionValues, setPredictionValues] = useState({
        "CO ppm": 0.17,
        "NO pphm": 1.75,
        "NO2 pphm": 1,
        "OZONE pphm": 1.75,
        "PM10 µg/m³": 22.5,
        "SO2 pphm": 0.10,
    });
    const [predictionResults, setPredictionResults] = useState([]);



    // Fetch initial data to be used in visualisation for KMeans and KNN models
    const fetchInitialData = async () => {
        try {
            const response = await axios.get(kMeanEndPoint);
            setClusterData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Call fetchInitialData on component mount
    useEffect(() => {
        fetchInitialData();
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
            case 'linear': setPath(linearEndPoint); break;
            case 'kmeans': setPath(kMeanEndPoint); break;
            case 'knn': setPath(knnEndPoint); break;
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
        if (selectedModel === 'linear') return true;
        if (selectedModel === 'kmeans') return ["CO ppm", "NO pphm", "PM10 µg/m³"].includes(slider.name);
        if (selectedModel === 'knn') return slider.name === selectedPollutant;
        return false;
    }).map(slider => ({
        ...slider,
        value: predictionValues[slider.name]
    }));






    return (
        <Container>
            <DropDownContainer
                models={['linear', 'kmeans', 'knn']}
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
            {/* <pre>{JSON.stringify(clusterData, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(knnData, null, 2)}</pre> */}

            <Container style={styles.graphContainer} >

                {selectedModel === 'linear' && (
                    <VisualisationLinearRegression
                        selectedHealthStat={selectedHealthStat}
                        predictionResults={predictionResults}
                        predictionValues={predictionValues}

                    />
                )}
                {selectedModel === 'kmeans' && (
                    <VisualisationKMean
                        predictionResults={predictionResults}
                        predictionValues={predictionValues}
                        clusterData={clusterData}
                    />
                )}
                {/* {selectedModel === 'knn' && (
                    <VisualisationKNN 
                        selectedHealthStat={selectedHealthStat} 
                        predictionValues={predictionValues}
                        selectedPollutant={selectedPollutant} 
                    />
                )} */}
            </Container>

            <SliderContainer
                sliders={visibleSliders}
                onSliderChange={handleSliderChange}
                color='primary'
            />

            <StatsBox predictionResults={predictionResults} />


        </Container>
    );
};

const styles = {
    graphContainer: {
        width: '100%',
        height: '50vh',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginTop: '20px',
        marginBottom: '20px',
    },
};

export default Visualisation;
