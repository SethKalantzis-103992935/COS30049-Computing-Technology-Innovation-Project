import React from 'react';
import { Container, Typography, Box } from '@mui/material';

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

const styles = {
    section: {
        marginBottom: 4
    },
    title: {
        textAlign: 'left',
        marginBottom: 2,
    },
    text: {
        marginBottom: 2,
        color: 'text.secondary',
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
