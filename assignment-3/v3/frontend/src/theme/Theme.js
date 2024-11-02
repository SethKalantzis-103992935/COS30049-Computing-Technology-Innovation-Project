/**
 * Theme.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 12, 2024.
 * Last Modified: November 02, 2024.
 * 
 * Purpose:
 * Defines the custom Material-UI theme for the application, specifying primary and  secondary 
 * colors, background, text, and model-specific colors. This theme is applied globally via MUI's 
 * ThemeProvider in the app root.
 * 
 * Usage:
 * To use the theme, import { useTheme } from '@mui/material/styles', and call useTheme() to access 
 * the theme in your components.
 */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#71b5bc' },            // Main brand color (teal / blue)
        secondary: { main: '#e7ab43' },          // Secondary brand color (orange)
        divider: '#6f6f6f',                      // Divider color for lists and cards
        background: {
            default: '#333238',                  // Default background color
            paper: '#4b4a50',                    // Paper background color
            footer: 'transparent',               // Footer background color (transparent)
            header: '#71b5bc'                    // Header background color
        },
        text: {
            primary: '#fff',                     // Primary text color (white)
            secondary: '#d8d7d9',                // Secondary text color (light grey)
            onLight: '#333238'                   // Text color on light backgrounds (dark grey)
        },
        model: {
            linearRegression: '#71b5bc',         // Linear regression model color (teal / blue)
            knn: '#e7ab43',                      // KNN model color (orange)
            kMean: '#dd94b8'                     // K-Means model color (pink)
        },
        graph: {
            redPoint: '#d63f3f',                 // Red data point color
            greenPoint: '#4caf50',               // Green data point color
            bluePoint: '#2196f3',                // Blue data point color
            orangePoint: '#ff9800',              // Orange data point color
            purplePoint: '#673ab7',              // Purple data point color
            pinkPoint: '#e91e63',                // Pink data point color
            yellowPoint: '#ffeb3b',              // Yellow data point color
            blackDefault: '#000000',             // Default black color
        } 
    }
});

export default theme;
