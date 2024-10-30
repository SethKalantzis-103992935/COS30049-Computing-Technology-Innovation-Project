import React, { useState } from 'react'
import { Box } from '@mui/material'
import HeaderAppBar from './HeaderAppBar';
import SideBar from './SideBar';

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
            <SideBar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
        </Box>
    )
}

export default Header