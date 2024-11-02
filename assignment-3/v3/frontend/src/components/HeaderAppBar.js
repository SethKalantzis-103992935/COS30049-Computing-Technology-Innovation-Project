/**
 * HeaderAppBar.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 20, 2024.
 * Last Modified: November 2, 2024.
 * 
 * Purpose:
 * This component represents the application’s top navigation bar, including the logo and a menu 
 * button. It manages the logo's hover state and provides a way to toggle the visibility of the 
 * navigation menu.
 * 
 * Usage:
 * This component is imported and used within the Header component to provide navigation 
 * functionality.
 */

import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

// HeaderAppBar component
const HeaderAppBar = ({ setIsMenuOpen }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [logoSrc, setLogoSrc] = React.useState('/img/breathe-easy-logo-name.png');

    /**
     * Handles the menu button click event.
     * This function prevents event propagation and toggles the menu visibility.
     */
    const handleMenuClick = (event) => {
        event.stopPropagation(); 
        setIsMenuOpen(prev => !prev);
    };

    return (
        <AppBar component="header" position="fixed" disableGutters sx={styles.appBar}>
            <Toolbar component="nav" sx={styles.toolbar(isMobile)}>
                <Box
                    display="flex"
                    alignItems="center"
                    sx={styles.logoContainer(isMobile)}
                    component={HashLink}
                    to="/#home"
                    onMouseEnter={() => setLogoSrc('/img/breathe-easy-logo-name-hover.png')}
                    onMouseLeave={() => setLogoSrc('/img/breathe-easy-logo-name.png')}
                >
                    <img
                        src={logoSrc}
                        alt="Logo"
                        style={styles.logoImage}
                    />
                </Box>
                <Box display="flex" justifyContent="flex-end" sx={styles.buttonContainer}>
                    <Button
                        color="inherit"
                        onClick={handleMenuClick}
                        sx={{ ...styles.link(false), flex: 1, justifyContent: 'center' }}
                    >
                        <MenuIcon sx={{ mr: isMobile ? 0.25 : 0.5 }} />
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

// Styles for the HeaderAppBar component
const styles = {
    appBar: {
        display: 'flex',
        justifyContent: 'flex-start',
        background: '#4b4a50',
        height: '64px',
    },
    toolbar: (isMobile) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: isMobile ? '0 8px' : '0 16px',
        height: '100%',
        width: '100%',
    }),
    logoContainer: (isMobile) => ({
        flexGrow: isMobile ? 1 : 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '60%',
        marginLeft: '16px',
    }),
    logoImage: {
        maxHeight: '85%',
        maxWidth: '100%',
        objectFit: 'contain',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
    },
    link: (isActive) => ({
        fontSize: '1rem',
        color: isActive ? 'secondary.main' : 'text.primary',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.3s',
        '&:hover': {
            color: 'secondary.main',
        },
    }),
};

export default HeaderAppBar;
