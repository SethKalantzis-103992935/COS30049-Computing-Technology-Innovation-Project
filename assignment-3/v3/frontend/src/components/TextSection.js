/**
 * TextSection.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 20, 2024.
 * Last Modified: November 02, 2024.
 * 
 * Purpose:
 * This component renders a section of text with a title and multiple paragraphs. It displays the 
 * title prominently and allows for the display of any number of text paragraphs, providing 
 * flexibility for different content needs.
 * 
 * Usage:
 * Import this component and provide the title and an array of text paragraphs to render it on the 
 * page. It is suitable for use in informational sections of the application.
 */

import React from 'react';
import { Container, Typography } from '@mui/material';

// TextSection component
const TextSection = ({ title, text }) => {
  return (
    <Container component="section">
        <Typography variant="h2" sx={styles.title}>
            {title}
        </Typography>
        {text.map((paragraph, index) => (
            <Typography key={index} variant="body1" sx={styles.text}>
                {paragraph}
            </Typography>
        ))}
    </Container>
  )
}

// Styles for the text section component
const styles = {
    title: {
        textAlign: 'center',
        marginBottom: 6,
        color: 'text.primary'
    },
    text: {
        marginBottom: 2,
        color: 'text.secondary',
        textAlign: 'left'
    }
}

export default TextSection;