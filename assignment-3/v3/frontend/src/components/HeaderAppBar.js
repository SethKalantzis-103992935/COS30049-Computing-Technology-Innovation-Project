import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';

const HeaderAppBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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
            <Toolbar component="nav">
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={styles.title(isScrolled)}
                >
                    breathe
                </Typography>
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
            </Toolbar>
        </AppBar>
    );
};

const styles = {
    appBar: (isScrolled) => ({
        backgroundColor: isScrolled ? 'background.header' : 'transparent',
        transition: 'all 0.5s',
        boxShadow: isScrolled ? '0px 4px 6px rgba(0, 0, 0, 0.3)' : 'none'
    }),
    title: (isScrolled) => ({
        flexGrow: 1,
        fontSize: '2rem',
        textDecoration: 'none',
        transition: 'all 0.5s',
        color: 'text.onLight',
    }),
    link: (isScrolled) => ({
        fontSize: '1rem',
        color: 'text.onLight'

    }),
};

export default HeaderAppBar;
