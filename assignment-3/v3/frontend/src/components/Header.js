import React, { useState } from 'react'
import { Box } from '@mui/material'
import HeaderAppBar from './HeaderAppBar';

const Header = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box sx={{ width: '100vw' }} >
            <HeaderAppBar toggleDrawer={toggleDrawer} />
        </Box>
    )
}

export default Header