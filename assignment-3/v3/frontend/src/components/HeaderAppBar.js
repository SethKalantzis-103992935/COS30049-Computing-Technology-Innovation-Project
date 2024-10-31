import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

const HeaderAppBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AppBar component="header" position="fixed" disableGutters sx={styles.appBar(isScrolled)}>
            <Toolbar component="nav" sx={styles.toolbar(isMobile)}>
                <Box display="flex" alignItems="center" sx={styles.logoContainer(isMobile)}>
                    <img
                        src="/img/breathe-easy-logo-name.png"
                        alt="Logo"
                        style={styles.logoImage}
                    />
                </Box>
                <Box display="flex" justifyContent="flex-end" sx={styles.buttonContainer}>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={styles.link(isScrolled, location.pathname === '/')}
                    >
                        <HomeIcon sx={{ mr: isMobile ? 0.25 : 0.5 }} />
                        {isMobile ? null : 'Home'}
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/about"
                        sx={styles.link(isScrolled, location.pathname === '/about')}
                    >
                        <InfoIcon sx={{ mr: isMobile ? 0.25 : 0.5 }} />
                        {isMobile ? null : 'About'}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

// Move styles to the bottom
const styles = {
    appBar: (isScrolled) => ({
        display: 'flex',
        justifyContent: 'flex-start',
        background: 'linear-gradient(90deg, rgba(0, 191, 255, 1), rgba(30, 130, 200, 1))',
        transition: 'background 0.5s ease, box-shadow 0.5s ease',
        boxShadow: isScrolled ? '0px 4px 15px rgba(0, 0, 0, 0.5)' : '0px 4px 10px rgba(0, 0, 0, 0.2)',
        height: '64px'
    }),
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
        justifyContent: isMobile ? 'center' : 'flex-start',
        alignItems: 'center',
        height: '60%',
    }),
    logoImage: {
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
    link: (isScrolled, isActive) => ({
        fontSize: '1rem',
        color: isActive ? 'secondary.main' : 'text.onLight',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.3s',
        '&:hover': {
            color: 'secondary.main',
        },
    }),
};

export default HeaderAppBar;
