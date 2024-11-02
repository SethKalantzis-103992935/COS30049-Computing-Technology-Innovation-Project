/**
 * ModelCard.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 23, 2024.
 * Last Modified: November 2, 2024.
 * 
 * Purpose:
 * This component displays a card representing a machine learning model. It includes an image that 
 * can change when clicked, a title, and description text. If an alternate image is provided, the 
 * component toggles between the initial and alternate image on click.
 * 
 * Usage:
 * This component should be used within a parent component where model details are available. It 
 * takes in props for the initial image source, an optional alternate image source, title, 
 * descriptive text, and title color. If no alternate image is provided, the image does not change.
 */

import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

// ModelCard Component
const ModelCard = ({ imgSrc, altImgSrc, title, text, titleColor }) => {
    // State to manage the currently displayed image
    const [currentImg, setCurrentImg] = useState(imgSrc);

    // Handler to toggle image on click if an alternate image is provided
    const handleImageClick = () => {
        if (altImgSrc) {
            setCurrentImg(prevImg => prevImg === imgSrc ? altImgSrc : imgSrc);
        }
    };

    return (
        <Card sx={styles.card}>
            <CardActionArea onClick={handleImageClick}>
                <CardMedia
                    component="img"
                    image={currentImg}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={styles.title(titleColor)}>
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={styles.text}>
                        {text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

// Styles for the ModelCard component
const styles = {
    card: {
        maxWidth: 250,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'transparent'
        }
    },
    title: (titleColor) => ({
        textAlign: 'center',
        color: titleColor
    }),
    text: {
        color: 'text.secondary',
        textAlign: 'center'
    },
};

export default ModelCard;
