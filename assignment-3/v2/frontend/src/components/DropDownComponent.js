import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DropDownComponent = ({ label, value, onChange, options }) => {
    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={onChange} label={label}>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DropDownComponent;
