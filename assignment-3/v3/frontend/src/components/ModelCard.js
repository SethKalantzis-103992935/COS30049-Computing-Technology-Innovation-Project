import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const ModelCard = ({ imgSrc, title, text, titleColor }) => {
    return (
        <Card sx={styles.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={imgSrc}
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

const styles = {
    card: {
        maxWidth: 250,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
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

export default ModelCard