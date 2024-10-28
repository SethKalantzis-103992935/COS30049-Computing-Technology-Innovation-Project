import React, { useState, useEffect } from "react";
import KMeansGraph from "./visualisation/KMeansGraph";
import {
    Container, Box, InputLabel, FormControl, NativeSelect, Typography, Slider
} from "@mui/material";
import {
    BrowserRouter as Router, Routes, Route, useNavigate
} from "react-router-dom";
import Spacer from "./components/Spacer";
import LogoRow from "./components/LogoRow";
import Hero from "./components/Hero"
import Header from "./components/Header"
import Footer from "./components/Footer"


function App() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [predictData, setPredictData] = useState({});
    const [xAxis, setXAxis] = useState("CO ppm");
    const [yAxis, setYAxis] = useState("NO pphm");
    const [zAxis, setZAxis] = useState("PM10 µg/m³");
    const [predictedValue, setPredictedValue] = useState("Asthma EDP");
    const [mainColor, setMainColor] = useState("#e3de8a");
    const [sliderValues, setSliderValues] = useState({
        "CO ppm": 0.17,
        "NO pphm": 1.75,
        "NO2 pphm": 1,
        "OZONE pphm": 1.75,
        "PM10 µg/m³": 22.5,
        "SO2 pphm": 0.10
    });
    const [predictedCluster, setPredictedCluster] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/kmeans")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleVisualizationChange = (event) => {
        const value = event.target.value;
        switch (value) {
            case "linear-regression":
                setMainColor("#e3de8a");
                navigate("/linear-regression");
                break;
            case "arima-time-series":
                setMainColor("#71b5bc");
                navigate("/arima-time-series");
                break;
            case "knn":
                setMainColor("#e7ab43");
                navigate("/knn");
                break;
            case "k-means":
                setMainColor("#dd94b8");
                navigate("/k-means");
                break;
            default:
                setMainColor("#e3de8a");
                navigate("/linear-regression")
        }
    };

    const handleSliderChange = (pollutant, value) => {
        setSliderValues(prevValues => ({
            ...prevValues,
            [pollutant]: value
        }));
    }

    const onPredict = async (sliderValues) => {
        const response = await fetch('http://127.0.0.1:8000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sliderValues),
        });
        
        const result = await response.json();
        return result.predictedCluster; // Ensure this matches your response structure
      };
      

    return (
        // Body of the App component
        <div className="App"
            style={{
                backgroundColor: "#333238",
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflowX: "hidden"
            }}
        >
            {/* Main */}
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    overflowX: "hidden"

                }}
            >
                <Header />
                <Hero
                    imgSrc="/img/hero-index.png"
                    titleText="Title"
                    subtitleText="This is a subtitle that goes below the title"
                    titleTopPadding='25vh'
                    titleLeftPadding='10vw'
                />
                <Spacer />
                <LogoRow />
                <Spacer />
                {/* Dropdown Menu Row */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "60px",
                        height: "100px",
                        width: "100%",
                    }}
                >
                    {/* Model Selection Drop Down */}
                    <FormControl>
                        <NativeSelect
                            onChange={handleVisualizationChange}
                            inputProps={{
                                name: 'visualization',
                                id: 'visualization',
                            }}
                            disableUnderline
                            sx={{
                                fontSize: "36px",
                                color: mainColor,
                            }}
                        >
                            <option value="linear-regression">Linear Regression</option>
                            <option value="arima-time-series">ARIMA Time Series</option>
                            <option value="knn">KNN</option>
                            <option value="k-means">K-Means</option>
                        </NativeSelect>
                    </FormControl>
                    {/* Axis and Predicted Values Container */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                            height: "100px"
                        }}
                    >
                        {/* X Axis Drop Down */}
                        <FormControl>
                            <InputLabel
                                variant="standard"
                                htmlFor="xAxis"
                                sx={{ color: mainColor }}
                            >
                                X Axis
                            </InputLabel>
                            <NativeSelect
                                value={xAxis}
                                onChange={(event) => setXAxis(event.target.value)}
                                inputProps={{
                                    name: 'xAxis',
                                    id: 'xAxis',
                                }}
                                sx={{ color: '#d8d7d9' }}
                            >
                                <option
                                    value="CO ppm"
                                    hidden={yAxis === "CO ppm" || zAxis === "CO ppm"}
                                >
                                    CO ppm
                                </option>
                                <option
                                    value="NO pphm"
                                    hidden={yAxis === "NO pphm" || zAxis === "NO pphm"}
                                >
                                    NO pphm
                                </option>
                                <option
                                    value="NO2 pphm"
                                    hidden={yAxis === "NO2 pphm" || zAxis === "NO2 pphm"}
                                >
                                    NO2 pphm
                                </option>
                                <option
                                    value="OZONE pphm"
                                    hidden={yAxis === "OZONE pphm" || zAxis === "OZONE pphm"}
                                >
                                    OZONE pphm
                                </option>
                                <option
                                    value="PM10 µg/m³"
                                    hidden={yAxis === "PM10 µg/m³" || zAxis === "PM10 µg/m³"}
                                >
                                    PM10 µg/m³
                                </option>
                                <option
                                    value="SO2 pphm"
                                    hidden={yAxis === "SO2 pphm" || zAxis === "SO2 pphm"}
                                >
                                    SO2 pphm
                                </option>
                            </NativeSelect>
                        </FormControl>
                        {/* Y Axis Drop Down */}
                        <FormControl>
                            <InputLabel
                                variant="standard"
                                htmlFor="yAxis"
                                sx={{ color: mainColor }}
                            >
                                Y Axis
                            </InputLabel>
                            <NativeSelect
                                value={yAxis}
                                onChange={(event) => setYAxis(event.target.value)}
                                inputProps={{
                                    name: 'yAxis',
                                    id: 'yAxis',
                                }}
                                sx={{ color: '#d8d7d9' }}
                            >
                                <option
                                    value="CO ppm"
                                    hidden={xAxis === "CO ppm" || zAxis === "CO ppm"}
                                >
                                    CO ppm
                                </option>
                                <option
                                    value="NO pphm"
                                    hidden={xAxis === "NO pphm" || zAxis === "NO pphm"}
                                >
                                    NO pphm
                                </option>
                                <option
                                    value="NO2 pphm"
                                    hidden={xAxis === "NO2 pphm" || zAxis === "NO2 pphm"}
                                >
                                    NO2 pphm
                                </option>
                                <option
                                    value="OZONE pphm"
                                    hidden={xAxis === "OZONE pphm" || zAxis === "OZONE pphm"}
                                >
                                    OZONE pphm
                                </option>
                                <option
                                    value="PM10 µg/m³"
                                    hidden={xAxis === "PM10 µg/m³" || zAxis === "PM10 µg/m³"}
                                >
                                    PM10 µg/m³
                                </option>
                                <option
                                    value="SO2 pphm"
                                    hidden={xAxis === "SO2 pphm" || zAxis === "SO2 pphm"}
                                >
                                    SO2 pphm
                                </option>
                            </NativeSelect>
                        </FormControl>
                        {/* Z Axis Drop Down */}
                        <FormControl>
                            <InputLabel
                                variant="standard"
                                htmlFor="zAxis"
                                sx={{ color: mainColor }}
                            >
                                Z Axis
                            </InputLabel>
                            <NativeSelect
                                value={zAxis}
                                onChange={(event) => setZAxis(event.target.value)}
                                inputProps={{
                                    name: 'zAxis',
                                    id: 'zAxis',
                                }}
                                sx={{
                                    color: '#d8d7d9'
                                }}
                            >
                                <option
                                    value="CO ppm"
                                    hidden={xAxis === "CO ppm" || yAxis === "CO ppm"}
                                >
                                    CO ppm
                                </option>
                                <option
                                    value="NO pphm"
                                    hidden={xAxis === "NO pphm" || yAxis === "NO pphm"}
                                >
                                    NO pphm
                                </option>
                                <option
                                    value="NO2 pphm"
                                    hidden={xAxis === "NO2 pphm" || yAxis === "NO2 pphm"}
                                >
                                    NO2 pphm
                                </option>
                                <option
                                    value="OZONE pphm"
                                    hidden={xAxis === "OZONE pphm" || yAxis === "OZONE pphm"}
                                >
                                    OZONE pphm
                                </option>
                                <option
                                    value="PM10 µg/m³"
                                    hidden={xAxis === "PM10 µg/m³" || yAxis === "PM10 µg/m³"}
                                >
                                    PM10 µg/m³
                                </option>
                                <option
                                    value="SO2 pphm"
                                    hidden={xAxis === "SO2 pphm" || yAxis === "SO2 pphm"}
                                >
                                    SO2 pphm
                                </option>
                            </NativeSelect>
                        </FormControl>
                        {/* Predicted Value Drop Down */}
                        <FormControl>
                            <InputLabel
                                variant="standard"
                                htmlFor="predictedValue"
                                sx={{ color: mainColor }}
                            >
                                Predicted Value
                            </InputLabel>
                            <NativeSelect
                                value={predictedValue}
                                onChange={(event) => setPredictedValue(event.target.value)}
                                inputProps={{
                                    name: 'predictedValue',
                                    id: 'predictedValue',
                                }}
                                sx={{ color: '#d8d7d9' }}
                            >
                                <option
                                    value="asthma deaths"
                                >
                                    Asthma Deaths
                                </option>
                                <option
                                    value="asthma edp"
                                >
                                    Asthma EDP
                                </option>
                                <option
                                    value="asthma hospitalisations"
                                >
                                    Asthma Hospitalisations
                                </option>
                                <option
                                    value="asthma pic"
                                >
                                    Asthma PIC
                                </option>
                                <option
                                    value="copd deaths"
                                >
                                    COPD Deaths
                                </option>
                                <option
                                    value="copd hospitalisations"
                                >
                                    COPD Hospitalisations
                                </option>
                                <option
                                    value="iap deaths"
                                >
                                    IAP Deaths
                                </option>
                                <option
                                    value="iap hospitalisations"
                                >
                                    IAP Hospitalisations
                                </option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </Box>
                {/* Visualization Container */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "600px",
                        width: "100%",
                        bgcolor: "#6f6f6f",
                        borderRadius: "8px"
                    }}
                >
                    {/* Visualization */}
                    <Routes>
                        <Route
                            path="/k-means"
                            element={
                                <KMeansGraph
                                    data={data}
                                    xAxis={xAxis}
                                    yAxis={yAxis}
                                    zAxis={zAxis}
                                    sliderValues={sliderValues}
                                    onPredict={onPredict}
                                    predictedValue="asthma edp"
                                />
                            }
                        />
                        <Route
                            path="/knn"
                            element={<Typography variant="p">KNN</Typography>}
                        />
                        <Route
                            path="/linear-regression"
                            element={<Typography variant="p">Linear Regression</Typography>}
                        />
                        <Route
                            path="/arima-time-series"
                            element={<Typography variant="p">ARIMA Time Series</Typography>}
                        />
                    </Routes>
                </Box>
                {/* Sliders Container */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "20px",
                        width: "100%",
                        marginTop: "20px",
                    }}
                >
                    {[
                        { name: "CO ppm", min: 0, max: 0.35, step: 0.01 },
                        { name: "NO pphm", min: 0, max: 3.50, step: 0.01 },
                        { name: "NO2 pphm", min: 0, max: 2, step: 0.01 },
                        { name: "OZONE pphm", min: 1, max: 2.50, step: 0.01 },
                        { name: "PM10 µg/m³", min: 10, max: 35, step: 0.1 },
                        { name: "SO2 pphm", min: 0, max: 0.20, step: 0.01 },
                    ].map((pollutant) => (
                        <Box key={pollutant.name} sx={{ width: "15%" }}>
                            <Typography variant="body1" sx={{ color: "#ffffff" }}>
                                {pollutant.name}
                            </Typography>
                            <Slider
                                value={sliderValues[pollutant.name]}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={pollutant.step}
                                min={pollutant.min}
                                max={pollutant.max}
                                sx={{ color: mainColor }}
                                onChange={(event, value) => handleSliderChange(pollutant.name, value)}
                            />
                        </Box>
                    ))}
                </Box>
                {/* Text About Visualization */}
                <Typography variant="h6" sx={{ color: "#ffffff", marginTop: "40px" }}>
                    <Routes>
                        <Route
                            path="/k-means"
                            element={"This is an explanation of what k-means is, how it was applied, and how to interpret this graph. This is an explanation of what k-means is, how it was applied, and how to interpret this graph. This is an explanation of what k-means is, how it was applied, and how to interpret this graph. This is an explanation of what k-means is, how it was applied, and how to interpret this graph. This is an explanation of what k-means is, how it was applied, and how to interpret this graph. "}
                        />
                        <Route
                            path="/knn"
                            element={"This is an explanation of what knn is, how it was applied, and how to interpret this graph. This is an explanation of what knn is, how it was applied, and how to interpret this graph. This is an explanation of what knn is, how it was applied, and how to interpret this graph. This is an explanation of what knn is, how it was applied, and how to interpret this graph. This is an explanation of what knn is, how it was applied, and how to interpret this graph. "}

                        />
                        <Route
                            path="/linear-regression"
                            element={"This is an explanation of what linear regression is, how it was applied, and how to interpret this graph. This is an explanation of what linear regression is, how it was applied, and how to interpret this graph. This is an explanation of what linear regression is, how it was applied, and how to interpret this graph. This is an explanation of what linear regression is, how it was applied, and how to interpret this graph. This is an explanation of what linear regression is, how it was applied, and how to interpret this graph. "}

                        />
                        <Route
                            path="/arima-time-series"
                            element={"This is an explanation of what arima time-series is, how it was applied, and how to interpret this graph. This is an explanation of what arima time-series is, how it was applied, and how to interpret this graph. This is an explanation of what arima time-series is, how it was applied, and how to interpret this graph. This is an explanation of what arima time-series is, how it was applied, and how to interpret this graph. This is an explanation of what arima time-series is, how it was applied, and how to interpret this graph. "}

                        />
                    </Routes>
                </Typography>
                <Spacer />
                <Footer />
            </Container>
        </div>
    );
}

export default App;