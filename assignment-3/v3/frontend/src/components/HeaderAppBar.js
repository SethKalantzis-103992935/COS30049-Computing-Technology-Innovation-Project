import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const HeaderAppBar = ({ toggleDrawer }) => {
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
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
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
        color: isScrolled ? 'inherit' : 'white',
    }),
    link: (isScrolled) => ({
        fontSize: '1rem',
        color: isScrolled ? 'inherit' : 'white',
    }),
};

export default HeaderAppBar;
