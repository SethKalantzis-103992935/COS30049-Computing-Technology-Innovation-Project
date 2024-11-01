import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AppBar, Toolbar, Button, Box, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import { mlModels } from '../constants/MLModels';

const HeaderAppBar = ({ selectedModel, setSelectedModel, isMenuOpen, setIsMenuOpen }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const dropdownRef = useRef(null);
    const [logoSrc, setLogoSrc] = useState('/img/breathe-easy-logo-name.png');

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, setIsMenuOpen]);

    const isAboutPage = location.pathname === '/about';

    return (
        <AppBar component="header" position="fixed" disableGutters sx={styles.appBar}>
            <Toolbar component="nav" sx={styles.toolbar(isMobile)}>
                <Box
                    display="flex"
                    alignItems="center"
                    sx={styles.logoContainer(isMobile)}
                    component={Link}
                    to="/"
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
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        sx={{ ...styles.link(false), flex: 1, justifyContent: 'center' }}
                    >
                        <MenuIcon sx={{ mr: isMobile ? 0.25 : 0.5 }} />
                    </Button>
                    <Collapse in={isMenuOpen} timeout="auto" unmountOnExit sx={styles.dropdownMenu(theme)} ref={dropdownRef}>
                        {Object.keys(mlModels).map((key) => (
                            <Button
                                key={key}
                                color="inherit"
                                smooth
                                onClick={() => setSelectedModel(mlModels[key])}
                                sx={{
                                    ...styles.link(isAboutPage ? false : selectedModel === mlModels[key]),
                                    flex: 1,
                                    justifyContent: 'center'
                                }}
                                component={HashLink}
                                to="/#visualisation"
                            >
                                {mlModels[key]}
                            </Button>
                        ))}
                        <Button
                            color="inherit"
                            component={Link}
                            to="/about"
                            smooth
                            sx={{ ...styles.link(isAboutPage), flex: 1, justifyContent: 'center' }}
                        >
                            About
                        </Button>
                    </Collapse>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

// Styles
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
        position: 'relative', // Needed for dropdown positioning
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
    dropdownMenu: (theme) => ({
        position: 'absolute',
        top: '64px',
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        minWidth: '150px', // Set a minimum width for the dropdown
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        zIndex: 1,
        padding: theme.spacing(1), // Adds padding around the dropdown content
    }),
};

export default HeaderAppBar;
