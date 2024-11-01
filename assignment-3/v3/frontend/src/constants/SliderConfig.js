// Slider Configurations
export const sliderConfig = [
    { name: "CO ppm", min: 0, max: 0.32, step: 0.01 },
    { name: "NO pphm", min: 0.06, max: 3.07, step: 0.01 },
    { name: "NO2 pphm", min: 0, max: 2, step: 0.01 },
    { name: "OZONE pphm", min: 1, max: 2.50, step: 0.01 },
    { name: "PM10 µg/m³", min: 12, max: 30.7, step: 0.1 },
    { name: "SO2 pphm", min: 0, max: 0.20, step: 0.01 },
];

export const sliderMidPoints = {
    "CO ppm": 0.17,
    "NO pphm": 1.75,
    "NO2 pphm": 1,
    "OZONE pphm": 1.75,
    "PM10 µg/m³": 22.5,
    "SO2 pphm": 0.10
};