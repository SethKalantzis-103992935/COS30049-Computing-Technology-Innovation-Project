/**
 * HeaderMenu.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 29, 2024.
 * Last Modified: November 2, 2024.
 * 
 * Purpose:
 * This component represents a collapsible menu for navigating between different machine learning 
 * models and the About page. It is a collapsible menu that appears when the user clicks the menu
 * button in the header.
 * 
 * Usage:
 * This component is used within the Header component and accepts props to control visibility, the 
 * selected model, and state management functions.
 */

import React from 'react';
import { Collapse, Button } from '@mui/material';
import { HashLink } from 'react-router-hash-link';
import { mlModels } from '../constants/MLModels';
import { useTheme } from '@mui/material/styles';

// HeaderMenu component
const HeaderMenu = ({ isMenuOpen, isAboutPage, selectedModel, setSelectedModel, dropdownRef }) => {
    const theme = useTheme();

    return (
        <Collapse 
            in={isMenuOpen} 
            timeout="auto" 
            unmountOnExit 
            sx={styles.dropdownMenu(theme)} 
            ref={dropdownRef}
        >
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
                component={HashLink}
                to="/about/#about"
                sx={{ ...styles.link(isAboutPage), flex: 1, justifyContent: 'center' }}
            >
                About
            </Button>
        </Collapse>
    );
};

// Styles for the HeaderMenu component
const styles = {
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
        position: 'fixed',
        top: 72,
        right: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: '150px',
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        zIndex: 1,
        padding: theme.spacing(1),
    }),
};

export default HeaderMenu;
