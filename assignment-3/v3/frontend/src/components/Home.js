import React from 'react'
import Hero from './Hero'
import { Container, Divider } from '@mui/material'
import ModelCardRow from './ModelCardRow'
import Visualisation from './Visualisation'

const Home = ({ selectedModel, setSelectedModel }) => {

    return (
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
            <Visualisation 
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
            />
        </Container>
    )
}

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

export default Home
