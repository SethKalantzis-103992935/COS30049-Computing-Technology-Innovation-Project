import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const DropDownHeading = ({ label, value, onChange, options }) => {
    const displayNames = {
        knn: 'KNN Clustering',
        linear: 'Linear Regression',
        kmeans: 'K-Means Clustering',
    };

    return (
        <FormControl fullWidth sx={styles.formControl}>
            <Select
                value={value}
                onChange={onChange}
                variant="outlined"
                sx={styles.select}
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

const styles = {
    formControl: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
            },
            '& .MuiSelect-icon': {
                color: 'white',
            },
        },
    },
    select: {
        fontSize: {
            xs: '2rem',
            sm: '2rem',
            md: '3.5rem'
        }
    },
};

export default DropDownHeading;
