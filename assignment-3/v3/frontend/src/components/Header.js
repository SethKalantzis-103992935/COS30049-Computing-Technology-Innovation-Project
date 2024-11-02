/**
 * Header.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 20, 2024.
 * Last Modified: November 2, 2024.
 * 
 * Purpose:
 * This component serves as the header for the application, containing the main navigation bar and 
 * menu options. It manages the state of the menu visibility and handles navigation based on the 
 * current route.
 * 
 * Usage:
 * This component is imported and used in the App.js file. It should only be used once in the 
 * application.
 */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import HeaderAppBar from './HeaderAppBar';
import HeaderMenu from './HeaderMenu';

// Header component
const Header = ({ selectedModel, setSelectedModel }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAboutPage = location.pathname === '/about';

    /**
     * Toggles the state of the menu open/close.
     * This function updates the isMenuOpen state based on its previous value.
     */
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <Box sx={styles.box}>
            <HeaderAppBar 
                setIsMenuOpen={toggleMenu}
            />
            <HeaderMenu 
                isMenuOpen={isMenuOpen}
                isAboutPage={isAboutPage}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
            />
        </Box>
    );
};

// Styles for the Header component
const styles = {
    box : {
        width: '100vw'
    }
};

export default Header;
