/**
 * Home.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 20, 2024.
 * Last Modified: November 2, 2024.
 * 
 * Purpose:
 * This component serves as the main landing page of the application, featuring a hero section,
 * model cards, and visualizations.
 * 
 * Usage:
 * The Home component accepts `selectedModel` and `setSelectedModel` as props to manage the 
 * state of the selected machine learning model, facilitating interaction between different 
 * components on the page.
 * 
 * Note: 
 * The component is wrapped in a div with the id 'home' to facilitate routing to the top of the 
 * page. By default, react-router-dom doesn't scroll to the top of the page when navigating to a
 * new route, so this is a workaround to ensure the user sees the top of the page when they
 * navigate to the home route.
 */

import React from 'react';
import Hero from './Hero';
import { Container, Divider } from '@mui/material';
import ModelCardRow from './ModelCardRow';
import VisualisationContainer from './VisualisationContainer';

// Home component
const Home = ({ selectedModel, setSelectedModel }) => {
    return (
        <div id='home'>
            <Container component="main" sx={styles.main}>
                <Hero
                    imgSrc="/img/hero-index.png"
                    titleText='Get Some Fresh Air!'
                    subtitleText="We've done the research so you don't have to. Breathe easy knowing 
                              how the air you breathe really affects the respiratory health of you 
                              and your community."
                    position={3}
                />
                <ModelCardRow
                    setSelectedModel={setSelectedModel}
                />
                <Divider sx={styles.divider} />
                <VisualisationContainer
                    selectedModel={selectedModel}
                    setSelectedModel={setSelectedModel}
                />
            </Container>
        </div>
    );
}

// Styles for the Home component
const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        width: '100%',
        maxWidth: '100%',
        padding: 2,
    },
    divider: {
        width: '100%',
        margin: 12,
    }
};

export default Home;
