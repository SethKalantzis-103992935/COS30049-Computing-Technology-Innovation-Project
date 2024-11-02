/**
 * EmbeddedMapSection.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 25, 2024.
 * Last Modified: October 25, 2024.
 * 
 * Purpose:
 * This component renders a section that includes a title, descriptive text, and an embedded iframe 
 * map. It can be seen as an extension of the TextSection component.
 * 
 * Usage:
 * Import this component and provide the necessary props, including the section title, descriptive 
 * text as an array of paragraphs, and the source URL for the iframe.
 */

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

// EmbeddedMapSection component
const EmbeddedMapSection = ({ title, text, iframeSrc }) => {
    return (
        <Container component="section" sx={styles.section}>
            <Typography variant="h2" sx={styles.title}>
                {title}
            </Typography>
            {text.map((paragraph, index) => (
                <Typography key={index} variant="body1" sx={styles.text}>
                    {paragraph}
                </Typography>
            ))}
            <Box
                component="iframe"
                src={iframeSrc}
                sx={styles.iframe}
                title={title}
            />
        </Container>
    );
};

// Component styles
const styles = {
    section: {
        marginBottom: 4
    },
    title: {
        textAlign: 'center',
        marginBottom: 2,
    },
    text: {
        marginBottom: 2,
        color: 'text.secondary',
        textAlign: 'left'
    },
    iframe: {
        width: '100%',
        height: '60vh',
        marginTop: 4,
        borderRadius: 2,
        border: '1px solid divider.main',
    }
};

export default EmbeddedMapSection;
