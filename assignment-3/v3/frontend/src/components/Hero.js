import React from 'react'
import { Box, Typography } from '@mui/material'

const Hero = ({ imgSrc, titleText, subtitleText, position }) => {
    return (
        <Box sx={styles.heroContainer}>
            <Box component='section' sx={styles.hero(imgSrc)}>
                <Box sx={styles.textContainer(position)}>
                    <Typography variant='h1' component='h1' sx={styles.title}>
                        {titleText}
                    </Typography>
                    <Typography variant='h2' component='h2' sx={styles.subtitle}>
                        {subtitleText}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

const styles = {
    heroContainer: {
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
    },
    hero: (imgSrc) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        color: 'primary.contrastText',
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        padding: '0 20px'
    }),
    textContainer: (position) => {
        let top, left, textAlign, width;
        switch (position) {
            case 1:
                top = '16%';
                left = '5%';
                textAlign = 'left';
                width = '40%';
                break;
            case 2:
                top = '60%';
                left = '50%';
                textAlign = 'right';
                width = '40%';
                break;
            default:
                top = '30%';
                left = '20%';
                textAlign = 'center';
                width = '60%';
                break;
        }
        return {
            position: 'absolute',
            textAlign: textAlign,
            top: top,
            left: left,
            width: width,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            color: 'text.secondary'
        };
    },
    title: {
        marginBottom: '20px',
        fontWeight: 'bold',
        fontSize: '5rem'
    },
    subtitle: {
        fontWeight: '300',
        fontSize: '2rem'
    }
};

export default Hero