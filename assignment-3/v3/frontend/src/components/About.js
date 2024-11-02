/**
 * About.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 20, 2024.
 * Last Modified: November 02, 2024.
 * 
 * Purpose:
 * This component renders the About page of the Breathe web app. It provides a structured overview 
 * to users about the purpose and development of the application.
 * 
 * Usage:
 * To use this component, import it as follows:
 * import About from './About';
 */

import React from 'react';
import Hero from './Hero';
import { Container, Divider } from '@mui/material';
import ProfileCardRow from './ProfileCardRow';
import TextSection from './TextSection';
import EmbeddedMapSection from './EmbeddedMapSection';
import { AboutBodyText } from '../constants/AboutBodyText';


// About component
const About = () => {
    return (
        <div id='about'>
            <Container component="main" sx={styles.main}>
                <Hero
                    imgSrc="/img/hero-about.png"
                    titleText='Why Did We Make This?'
                    subtitleText="We are a team of developers who care about the air you breathe. 
                                  Let us walk you through how we put all this together."
                    position={3}
                />
                <ProfileCardRow />
                <Divider sx={styles.divider} />
                <TextSection
                    title="Our Mission"
                    text={AboutBodyText.ourMission}
                />
                <Divider sx={styles.divider} />
                <EmbeddedMapSection
                    title="Data Sources"
                    text={AboutBodyText.dataSources}
                    iframeSrc={"https://www.google.com/maps/d/u/0/embed?mid=1ze3ga_Dk41KuIlO3ANLrwx1sgpSsjgA&ehbc=2E312F"}
                />
                <Divider sx={styles.divider} />
                <TextSection
                    title="Machine Learning"
                    text={AboutBodyText.machineLearning}
                />
                <Divider sx={styles.divider} />
                <TextSection
                    title="FastAPI"
                    text={AboutBodyText.fastApi}
                />
                <Divider sx={styles.divider} />
                <TextSection
                    title="React"
                    text={AboutBodyText.react}
                />
            </Container>
        </div>
    );
};

// Styles for the About component
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
    },
};

export default About;
