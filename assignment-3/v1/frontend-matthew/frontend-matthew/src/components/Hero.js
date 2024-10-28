import React from 'react'
import { Box, Typography, Container } from '@mui/material'

const Hero = ({ imgSrc, titleText, subtitleText, titleTopPadding, titleLeftPadding }) => {
    return (
        <Box
            sx={{ width: '100vw', height: '100vh'}}
        >
            <Container
                disableGutters
                maxWidth={false}
                sx={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    margin: 0,
                    padding: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                <Box
                    sx={{
                        paddingTop: titleTopPadding,
                        paddingLeft: titleLeftPadding,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        variant='h1'
                        sx={{
                            color: '#ffffff',
                            fontSize: '5rem'
                        }}
                    >
                        {titleText}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#ffffff',
                            fontSize: '2rem'
                        }}
                    >
                        {subtitleText}
                    </Typography>
                </Box>
            </Container >
        </Box>
    )
}

export default Hero
