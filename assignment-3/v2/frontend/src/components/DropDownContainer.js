import React from 'react';
import { Box } from '@mui/material';
import DropDownComponent from './DropDownComponent';

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
    return (
        <Box display="flex" flexDirection="row" gap={2}>
            <DropDownComponent
                label="Select Model"
                value={selectedModel}
                onChange={onModelChange}
                options={models}
            />

            <DropDownComponent
                label="Select Health Statistic"
                value={selectedHealthStat}
                onChange={onHealthStatChange}
                options={healthStats}
            />

            {selectedModel === 'knn' && (
                <DropDownComponent
                    label="Select Pollutant"
                    value={selectedPollutant}
                    onChange={onPollutantChange}
                    options={pollutants}
                />
            )}
        </Box>
    );
};

export default DropDownContainer;
