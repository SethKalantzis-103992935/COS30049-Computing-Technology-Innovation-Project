/**
 * DropDownContainer.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 20, 2024.
 * Last Modified: November 02, 2024.
 * 
 * Purpose:
 * This component serves as a container for multiple dropdowns. It is configured to accept props for
 * machine learning models and health statistics. The component renders two dropdowns side by side 
 * on larger screens and stacked on top of each other on smaller screens.
 * 
 * Usage:
 * Import this component and provide it with the necessary props for models, health statistics, 
 * and selected values to create a functional dropdown interface within your application.
 */

import React from 'react';
import { Box } from '@mui/material';
import DropDownComponent from './DropDownComponent';

// Container for dropdown components
const DropDownContainer = ({
    models = [],
    selectedModel,
    onModelChange,
    healthStats = [],
    selectedHealthStat,
    onHealthStatChange,
}) => {
    return (
        <Box sx={styles.box}>
            <DropDownComponent
                label="Model"
                value={selectedModel}
                onChange={onModelChange}
                options={models}
            />
            <DropDownComponent
                label="Health Statistic"
                value={selectedHealthStat}
                onChange={onHealthStatChange}
                options={healthStats}
            />
        </Box>
    );
};

// Styles for dropdown container
const styles = {
    box: {
        display: 'flex',
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
        },
        gap: 2
    },
};

export default DropDownContainer;
