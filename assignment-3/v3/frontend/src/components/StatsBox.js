import React from 'react'
import { Box, Container } from '@mui/material'

const StatsBox = ({ predictionResults }) => {
    return (
        <Container sx={styles.container}>
            {<pre>{JSON.stringify(predictionResults, null, 2)}</pre>}
        </Container>
    )
}

const styles = {
    container: {
        backgroundColor: '#44434a', // Not sure why theme is not working here
        color: 'text.primary',
        borderRadius: 1,
        padding: 2,
        margin: 1,
    }
}

export default StatsBox