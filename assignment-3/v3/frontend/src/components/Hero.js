/**
 * Hero.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 20, 2024.
 * Last Modified: November 2, 2024.
 * 
 * Purpose:
 * This component displays a hero section at the top of the page, featuring a background image, 
 * title text, and subtitle text. The layout adjusts based on screen size, providing responsive 
 * design for both mobile and desktop views.
 * 
 * Usage:
 * This component can be used to create an eye-catching introduction section for the  application, 
 * accepting props for the image source, title, subtitle, and text position.
 */

import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

// Hero component
const Hero = ({ imgSrc, titleText, subtitleText, position }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    /**
     * Retrieves the appropriate image source based on screen size.
     * This function modifies the image source for mobile devices by appending '-mobile' before the 
     * file extension.
     */
    const getImgSrc = (src) => {
        if (isMobile) {
            const parts = src.split('.');
            const extension = parts.pop();
            return `${parts.join('.')}-mobile.${extension}`;
        }
        return src;
    };

    return (
        <Box sx={styles.heroContainer(isMobile)}>
            <Box component='section' sx={styles.hero(getImgSrc(imgSrc), isMobile)}>
                <Box sx={styles.textContainer(position, isMobile)}>
                    <Typography variant='h1' component='h1' sx={styles.title(isMobile)}>
                        {titleText}
                    </Typography>
                    <Typography variant='h2' component='h2' sx={styles.subtitle(isMobile)}>
                        {subtitleText}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

// Styles for the Hero component
const styles = {
    heroContainer: (isMobile) => ({
        width: '100%',
        height: isMobile ? '100vh' : '75vh',
        overflow: 'hidden'
    }),
    hero: (imgSrc, isMobile) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        height: isMobile ? '100vh' : '75vh',
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
    /**
     * Determines the position of the text container based on the specified position and screen size.
     * This function returns an object with CSS properties for the text container based on the
     * specified position and screen size.
     */
    textContainer: (position, isMobile) => {
        let top, left, textAlign, width;
        if (isMobile) {
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
    title: (isMobile) => ({
        marginBottom: '20px',
        fontWeight: 'bold',
        fontSize: isMobile ? '3rem' : '4rem'
    }),
    subtitle: (isMobile) => ({
        fontWeight: '300',
        fontSize: isMobile ? '1.5rem' : '2rem'
    })
};

export default Hero;
