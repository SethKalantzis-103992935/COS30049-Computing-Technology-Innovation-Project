import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from '@mui/material';

function App() {

    const [darkMode, setDarkMode] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    }

    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    }

    return (
        <Container
            component='main'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                /* backgroundColor: 'theme.palette.background.default' */
                backgroundColor: 'red' // TESTING ONLY
            }}
        >

        </Container>
    );
}

export default App;
