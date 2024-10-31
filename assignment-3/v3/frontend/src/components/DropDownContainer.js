import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DropDownComponent from './DropDownComponent';
import DropDownHeading from './DropDownHeading';

const DropDownContainer = ({
    models = [],
    selectedModel,
    onModelChange,
    healthStats = [],
    selectedHealthStat,
    onHealthStatChange,
    pollutants = [],
    selectedPollutant,
    onPollutantChange,
}) => {
    // Display names for health statistics
    const displayNames = {
        "asthma deaths": "Asthma Deaths",
        "asthma edp": "Asthma Emergency Department Presentations",
        "asthma hospitalisations": "Asthma Hospitalisations",
        "asthma pic": "Asthma Prevalence in Children",
        "copd deaths": "Chronic Obstructive Pulmonary Disease Deaths",
        "copd hospitalisations": "Chronic Obstructive Pulmonary Disease Hospitalisations",
        "iap deaths": "Influenza and Pneumonia Deaths",
        "iap hospitalisations": "Influenza and Pneumonia Hospitalisations",
    };

    // Format health stats with display names
    const formattedHealthStats = healthStats.map(stat => ({
        value: stat,
        label: displayNames[stat] || stat,
    }));

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <DropDownHeading
                value={selectedModel}
                onChange={onModelChange}
                options={models}
                sx={styles.heading}
            />
            <Box display="flex" flexDirection="row" gap={2}>
                <DropDownComponent
                    label="Health Statistic"
                    value={selectedHealthStat}
                    onChange={onHealthStatChange}
                    options={formattedHealthStats}
                />
            </Box>
        </Box>
    );
};

const styles = {
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
};

export default DropDownContainer;
