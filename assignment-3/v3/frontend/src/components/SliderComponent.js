import React from 'react';
import { Slider, Typography, Container } from '@mui/material';

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

const styles = {
    slider: (color) => ({
        width: '100%',
        color: color,
        flex: 1
    }),
};

export default SliderComponent;