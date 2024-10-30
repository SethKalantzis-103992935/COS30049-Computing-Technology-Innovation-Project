import React from 'react';
import Hero from './Hero';
import { Container, Typography, Divider } from '@mui/material';
import ProfileCardRow from './ProfileCardRow';
import TextSection from './TextSection';
import EmbeddedMapSection from './EmbeddedMapSection';

const About = () => {
    return (
        <Container component="main" sx={styles.main}>
            <Hero
                imgSrc="/img/hero-about.png"
                titleText='Why Did We Make This?'
                subtitleText="We are a team of developers who care about the air you breathe. Let us 
                              walk you through how we put all this together."
                position={3}
            />
            <ProfileCardRow />
            <Divider sx={styles.divider} />
            <TextSection
                title="Our Mission"
                text={bodyText.ourMission}
            />
            <Divider sx={styles.divider} />
            <EmbeddedMapSection
                title="Data Sources"
                text={bodyText.dataSources}
                ListItems={["this", "that", "the other thing"]}
                iframeSrc={"https://www.google.com/maps/d/u/0/embed?mid=1ze3ga_Dk41KuIlO3ANLrwx1sgpSsjgA&ehbc=2E312F"}
            />
            <Divider sx={styles.divider} />
            <TextSection
                title="Machine Learning"
                text={bodyText.machineLearning}
            />
            <Divider sx={styles.divider} />
            <TextSection
                title="FastAPI"
                text={bodyText.fastApi}
            />
            <Divider sx={styles.divider} />
            <TextSection
                title="React"
                text={bodyText.react}
            />
        </Container>
    );
};

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

const bodyText = {
    ourMission: [
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect.",
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect.",
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect."
    ],
    dataSources: [
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect.",
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect."
    ],
    machineLearning: [
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect.",
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect."
    ],
    fastApi: [
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect.",
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect."
    ],
    react: [
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect.",
        "Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect. Gobbledygook and words to that effect."
    ]
}

export default About;
