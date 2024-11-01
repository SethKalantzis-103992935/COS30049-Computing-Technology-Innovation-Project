import React from 'react';
import ModelCard from './ModelCard';
import { Grid2, Box } from '@mui/material';
import { mlModels } from '../constants/MLModels';
import { HashLink } from 'react-router-hash-link';

const ModelCardRow = ({ setSelectedModel }) => {
    return (
        <Grid2 container spacing={8} sx={styles.container}>
            <Grid2 item>
                <Box
                    onClick={() => setSelectedModel(mlModels.linear)}
                    component={HashLink}
                    to="/#visualisation"
                    sx={styles.link} // Add style here
                >
                    <ModelCard
                        imgSrc='/img/linear-regression-logo.png'
                        title='Linear Regression'
                        text='Predict continuous outputs from input features.'
                        titleColor='model.linearRegression'
                    />
                </Box>
            </Grid2>
            <Grid2 item>
                <Box
                    onClick={() => setSelectedModel(mlModels.knn)}
                    component={HashLink}
                    to="/#visualisation"
                    smooth
                    sx={styles.link} // Add style here
                >
                    <ModelCard
                        imgSrc='/img/knn-classification-logo.png'
                        title='KNN Classification'
                        text='Forecast trends using past values and noise.'
                        titleColor='model.knn'
                    />
                </Box>
            </Grid2>
            <Grid2 item>
                <Box
                    onClick={() => setSelectedModel(mlModels.kmeans)}
                    component={HashLink}
                    to="/#visualisation"
                    smooth
                    sx={styles.link} // Add style here
                >
                    <ModelCard
                        imgSrc='/img/k-means-clustering-logo.png'
                        title='K-Mean Clustering'
                        text='Group data into similar, distinct clusters.'
                        titleColor='model.kMean'
                    />
                </Box>
            </Grid2>
        </Grid2>
    );
}

const styles = {
    container: {
        marginTop: 12,
        justifyContent: 'center',
        width: '100%',
        padding: 2,
    },
    link: {
        textDecoration: 'none', // Remove underlines
        display: 'block', // Ensure Box behaves like a block element
    },
};

export default ModelCardRow;
