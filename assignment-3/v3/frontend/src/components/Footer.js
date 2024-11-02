/**
 * Footer.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 24, 2024.
 * Last Modified: November 02, 2024.
 * 
 * Purpose:
 * This component renders the footer of the application, including a divider with logos for 
 * React and FastAPI and a copyright notice. It provides a simple and  visually appealing bottom 
 * section for the app.
 * 
 * Usage:
 * Import this component and include it at the bottom of the App component to ensure it appears on 
 * every page. It should only be used once per application.
 */

import React from 'react';
import { Container, Typography, Divider, Box } from '@mui/material';

// Footer component
const Footer = () => {
    return (
        <Container component="footer" sx={styles.footer}>
            <Divider sx={styles.divider}>
                <Box sx={styles.dividerImgContainer}>
                    <img src="/img/react-logo.png" alt="React" style={styles.dividerImg} />
                    <img src="/img/fastapi-logo.png" alt="Fast API" style={styles.dividerImg} />
                </Box>
            </Divider>
            <Typography variant="body2" sx={styles.text}>
                &copy; 2024 Anti-Pesto Party. All rights reserved.
            </Typography>
        </Container>
    )
}

// Styles for the footer component
const styles = {
    footer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        marginTop: 10,
    },
    text: {
        marginTop: '1rem',
        color: 'text.secondary',
    },
    img: {
        maxHeight: '50px',
        width: 'auto',
    },
    divider: {
        width: '100%',
    },
    dividerImgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        height: '20px',
    },
    dividerImg: {
        height: '100%',
    }
}

export default Footer;
