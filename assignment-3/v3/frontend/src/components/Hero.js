import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const Hero = ({ imgSrc, titleText, subtitleText, position }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const getImgSrc = (src) => {
        if (isSmallScreen) {
            const parts = src.split('.');
            const extension = parts.pop();
            return `${parts.join('.')}-mobile.${extension}`;
        }
        return src;
    };

    return (
        <Box sx={styles.heroContainer(isSmallScreen)}>
            <Box component='section' sx={styles.hero(getImgSrc(imgSrc), isSmallScreen)}>
                <Box sx={styles.textContainer(position, isSmallScreen)}>
                    <Typography variant='h1' component='h1' sx={styles.title(isSmallScreen)}>
                        {titleText}
                    </Typography>
                    <Typography variant='h2' component='h2' sx={styles.subtitle(isSmallScreen)}>
                        {subtitleText}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

const styles = {
    heroContainer: (isSmallScreen) => ({
        width: '100%',
        height: isSmallScreen ? '100vh' : '75vh', // Adjust height based on screen size
        overflow: 'hidden'
    }),
    hero: (imgSrc, isSmallScreen) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        height: isSmallScreen ? '100vh' : '75vh', // Adjust height here too
        width: '100%',
        color: 'primary.secondary',
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        padding: '0 20px'
    }),
    textContainer: (position, isSmallScreen) => {
        let top, left, textAlign, width;
        if (isSmallScreen) {
            top = '20%';
            left = '10%';
            width = '80%';
            textAlign = 'center';
        } else {
            switch (position) {
                case 1:
                    top = '16%';
                    left = '5%';
                    textAlign = 'left';
                    width = '50%';
                    break;
                case 2:
                    top = '40%';
                    left = '50%';
                    textAlign = 'right';
                    width = '50%';
                    break;
                default:
                    top = '35%';
                    left = '20%';
                    textAlign = 'center';
                    width = '60%';
                    break;
            }
        }
        return {
            position: 'absolute',
            textAlign: textAlign,
            top: top,
            left: left,
            width: width,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
            color: 'text.primary'
        };
    },
    title: (isSmallScreen) => ({
        marginBottom: '20px',
        fontWeight: 'bold',
        fontSize: isSmallScreen ? '3rem' : '4rem'
    }),
    subtitle: (isSmallScreen) => ({
        fontWeight: '300',
        fontSize: isSmallScreen ? '1.5rem' : '2rem'
    })
};

export default Hero;
