/**
 * SliderComponent.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 21, 2024.
 * Last Modified: October 29, 2024.
 * 
 * Purpose:
 * This component renders a slider for selecting pollutant levels. It displays a label for the 
 * slider and allows users to adjust the value within specified minimum and maximum limits. The 
 * component accepts props to customize its appearance and behavior, including the name, current 
 * value, range, step size, and color.
 * 
 * Usage:
 * Import this component and include it in your form or settings to allow users to adjust the 
 * values for pollutants. Pass the appropriate props for customization and event handling.
 */

import React from 'react';
import { Slider, Typography, Container } from '@mui/material';

// SliderComponent renders a slider with a label
const SliderComponent = ({ name, value, min, max, step, onChange, color }) => {
    return (
        <Container>
            <Typography variant="body1" style={{ color: '#ffffff' }}>
                {name}
            </Typography>
            <Slider
                value={value}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={step}
                min={min}
                max={max}
                onChange={(event, newValue) => onChange(name, newValue)}
                sx={styles.slider(color)}
            />
        </Container>
    );
};

// Styles for the slider component
const styles = {
    slider: (color) => ({
        width: '100%',
        color: color,
        flex: 1
    }),
};

export default SliderComponent;
