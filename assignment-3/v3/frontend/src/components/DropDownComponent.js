/**
 * DropDownComponent.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 20, 2024.
 * Last Modified: November 02, 2024.
 * 
 * Purpose:
 * This component renders a dropdown selection for models or health statistics, utilizing a 
 * mapping of display names for user-friendly representation..
 * 
 * Usage:
 * Import this component and provide it with the necessary props, including label, selected 
 * value, change handler, and options. It can be used for selecting models or health statistics 
 * within the application. Appropriate display name mappings need to be provided for the options.
 */

import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { displayNames } from '../constants/DisplayNames';

// DropDown Component
// Renders a dropdown selection for models or health statistics. Iterates through each entry in 
// options, and switches it for a user-friendly display name if one is present.
const DropDownComponent = ({ label, value, onChange, options }) => {
    return (
        <FormControl fullWidth variant="outlined" margin="normal" sx={styles.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                sx={styles.select}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {displayNames[option] || option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

// Styles for dropdown component
const styles = {
    formControl: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiSelect-icon': {
            color: 'white',
        },
    },
};

export default DropDownComponent;
