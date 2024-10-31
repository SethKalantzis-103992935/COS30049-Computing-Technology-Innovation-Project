import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DropDownComponent = ({ label, value, onChange, options }) => {
    return (
        <FormControl fullWidth variant="outlined" margin="normal" sx={styles.formControl}>
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={onChange} label={label}>
                {options.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                        {label}
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
