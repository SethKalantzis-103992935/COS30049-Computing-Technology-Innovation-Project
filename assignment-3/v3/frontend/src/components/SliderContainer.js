/**
 * SliderContainer.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 21, 2024.
 * Last Modified: October 29, 2024.
 * 
 * Purpose:
 * This component serves as a container for multiple slider components, allowing for the 
 * organization and presentation of sliders that control various parameters in the application. It 
 * renders each slider based on the provided configurations.
 * 
 * Usage:
 * Import this component and use it in the parent component, passing the array of sliders and a 
 * change handler for slider adjustments. The color prop determines the appearance of the sliders.
 */

import React from 'react';
import SliderComponent from './SliderComponent';
import { Box } from '@mui/material';

// SliderContainer component
const SliderContainer = ({ sliders, onSliderChange, color }) => {
    return (
        <Box sx={styles.container}>
            {sliders.map((slider) => (
                <SliderComponent
                    key={slider.name}
                    name={slider.name}
                    value={slider.value}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    onChange={onSliderChange}
                    color={color}
                />
            ))}
        </Box>
    );
};

// Styles for the slider container
const styles = {
    container: {
        display: 'flex',
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row'
        },
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
};

export default SliderContainer;
