import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';

function App() {
    return (
        <Box component='body' sx={styles.body}>
            <Header />
            <Routes>
                {<Route path="/" element={<Home />} />}
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </Box>
    );
}

const styles = {
    body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
    }
};

export default App;
