import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SliderContainer from './SliderContainer';
import DropDownContainer from './DropDownContainer';
import VisualisationKNN from './VisualisationKNN';
import VisualisationLinearRegression from './VisualisationLinearRegression';
import VisualisationKMean from './VisualisationKMean';

const Visualisation = () => {

    const pollutants = [ 'CO ppm', 'NO pphm', 'NO2 pphm', 'OZONE pphm', 'PM10 µg/m³', 'SO2 pphm' ];
    const healthStats = [
        'asthma deaths', 'asthma edp', 'asthma hospitalisations', 'asthma pic', 'copd deaths', 
        'copd hospitalisations', 'iap deaths', 'iap hospitalisations'
    ];

    const linearEndPoint = 'http://127.0.0.1:8000/regression-model';
    const kMeanEndPoint = 'http://127.0.0.1:8000/cluster-model';
    const knnEndPoint = 'http://127.0.0.1:8000/knn-model';

    const [clusterData, setClusterData] = useState(null);

    const fetchInitialData = async () => {
        try {
            const response = await axios.get(kMeanEndPoint);
            setClusterData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);



    const [path, setPath] = useState(linearEndPoint);
    const [fetchedData, setFetchedData] = useState([]);
    const [selectedModel, setSelectedModel] = useState('linear');
    const [selectedHealthStat, setSelectedHealthStat] = useState(healthStats[0]);
    const [selectedPollutant, setSelectedPollutant] = useState(pollutants[0]);
    const [predictionValues, setPredictionValues] = useState({
        "CO ppm": 0.17,
        "NO pphm": 1.75,
        "NO2 pphm": 1,
        "OZONE pphm": 1.75,
        "PM10 µg/m³": 22.5,
        "SO2 pphm": 0.10,
    });

    const sliderConfig = [
        { name: "CO ppm", min: 0, max: 0.35, step: 0.01 },
        { name: "NO pphm", min: 0, max: 3.50, step: 0.01 },
        { name: "NO2 pphm", min: 0, max: 2, step: 0.01 },
        { name: "OZONE pphm", min: 1, max: 2.50, step: 0.01 },
        { name: "PM10 µg/m³", min: 10, max: 35, step: 0.1 },
        { name: "SO2 pphm", min: 0, max: 0.20, step: 0.01 },
    ];

    const formatDataForAPI = () => ({
        CO_ppm: predictionValues["CO ppm"],
        NO_pphm: predictionValues["NO pphm"],
        NO2_pphm: predictionValues["NO2 pphm"],
        OZONE_pphm: predictionValues["OZONE pphm"],
        PM10_ug_m3: predictionValues["PM10 µg/m³"],
        SO2_pphm: predictionValues["SO2 pphm"],
        label: selectedHealthStat
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(path, formatDataForAPI());
            setFetchedData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSliderChange = (name, value) => {
        setPredictionValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

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

    const handleHealthStatChange = (event) => {
        setSelectedHealthStat(event.target.value);
    };

    const handlePollutantChange = (event) => {
        setSelectedPollutant(event.target.value);
    };

    useEffect(() => {
        fetchData();
    }, [path, predictionValues, selectedModel, selectedHealthStat, selectedPollutant]);

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
        <div style={{ width: '100%' }}>
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

            {/* <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
            <pre>{JSON.stringify(predictionValues, null, 2)}</pre>
            <pre>{JSON.stringify(clusterData, null, 2)}</pre> */}

            {/* {selectedModel === 'linear' && (
                <VisualisationLinearRegression 
                    selectedHealthStat={selectedHealthStat} 
                    fetchedData={fetchedData} 
                />
            )} */}
            {selectedModel === 'kmeans' && (
                <VisualisationKMean 
                    clusterStats={fetchedData}
                    predictionValues={predictionValues}
                    clusterData={clusterData} 
                />
            )}
            {selectedModel === 'knn' && (
                <VisualisationKNN 
                    selectedHealthStat={selectedHealthStat} 
                    selectedPollutant={selectedPollutant} 
                />
            )}

            <SliderContainer
                sliders={visibleSliders}
                onSliderChange={handleSliderChange}
                color='text.primary'
            />


        </div>
    );
};

export default Visualisation;
