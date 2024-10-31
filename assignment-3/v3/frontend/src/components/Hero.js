import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'

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
        <Box sx={styles.heroContainer}>
            <Box component='section' sx={styles.hero(getImgSrc(imgSrc))}>
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
                    top = '60%';
                    left = '50%';
                    textAlign = 'right';
                    width = '50%';
                    break;
                default:
                    top = '30%';
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
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            color: 'text.secondary'
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

export default Hero
