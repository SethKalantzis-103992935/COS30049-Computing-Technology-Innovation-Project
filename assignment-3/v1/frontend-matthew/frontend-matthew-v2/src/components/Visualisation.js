import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

const Visualisation = () => {

    const [recordedData, setRecordedData] = useState([])
    const [predictedData, setPredictedData] = useState([])
    const [predictionValues, setPredictionValues] = useState({
        "CO ppm": 0.17,
        "NO pphm": 1.75,
        "NO2 pphm": 1,
        "OZONE pphm": 1.75,
        "PM10 µg/m³": 22.5,
        "SO2 pphm": 0.10,
        "label": "asthma edp"
    })
    const [axisValues, setAxisValues] = useState({
        "xAxis": "CO ppm",
        "yAxis": "NO pphm",
        "zAxis": "OZONE pphm"
    }) 





    return (
        <div>Visualisation</div>
    )
}

export default Visualisation