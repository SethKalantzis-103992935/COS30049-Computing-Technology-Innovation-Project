import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

const HeaderAppBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <AppBar
            component="header"
            position="fixed"
            disableGutters
            sx={styles.appBar(isScrolled)}
        >
            <Toolbar component="nav" sx={styles.toolbar(isMobile)}>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={styles.title(isScrolled, isMobile)}
                >
                    Breathe Easy
                </Typography>
                {isMobile ? (
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={styles.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                            sx={styles.link(isScrolled)}
                        >
                            Home
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/about"
                            sx={styles.link(isScrolled)}
                        >
                            About
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

const styles = {
    appBar: (isScrolled) => ({
        backgroundColor: isScrolled ? 'background.header' : 'transparent',
        transition: 'all 0.5s',
        boxShadow: isScrolled ? '0px 4px 6px rgba(0, 0, 0, 0.3)' : 'none',
        '&:hover': {
            backgroundColor: 'background.header',
        }
    }),
    toolbar: (isMobile) => ({
        display: 'flex',
        justifyContent: isMobile ? 'space-between' : 'flex-start',
    }),
    title: (isScrolled, isMobile) => ({
        flexGrow: 1,
        fontSize: isMobile ? '1.5rem' : '2rem',
        textDecoration: 'none',
        transition: 'all 0.5s',
        color: 'text.onLight',
    }),
    link: (isScrolled) => ({
        fontSize: '1rem',
        color: 'text.onLight'
    }),
    menuButton: {
        marginRight: 2,
    },
};

export default HeaderAppBar;
