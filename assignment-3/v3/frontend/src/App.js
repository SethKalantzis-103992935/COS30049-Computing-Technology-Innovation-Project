import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import { mlModels } from './constants/MLModels';

function App() {

    const [selectedModel, setSelectedModel] = useState(mlModels.linear);

    return (
        <Box component='body' sx={styles.body}>
            <Header 
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
            />
            <Routes>
                {<Route path="/" element={
                    <Home
                        selectedModel={selectedModel}
                        setSelectedModel={setSelectedModel} 
                    />
                    } />}
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
