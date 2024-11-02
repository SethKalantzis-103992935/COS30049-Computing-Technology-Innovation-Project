/**
 * ModelCardRow.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 23, 2024.
 * Last Modified: October 24, 2024.
 * 
 * Purpose:
 * This component serves as a container for displaying a row of machine learning model cards. Each 
 * card represents a different model, allowing users to select a model to visualize its results. The 
 * cards are clickable, and clicking them updates the selected model and navigates to the 
 * visualization section of the page.
 * 
 * Usage:
 * This component should be rendered within a parent component that manages the state for the 
 * selected model. The setSelectedModel function is passed as a prop to update the selected model in 
 * the parent state.
 */

import React from 'react';
import ModelCard from './ModelCard';
import { Grid2, Box } from '@mui/material';
import { mlModels } from '../constants/MLModels';
import { HashLink } from 'react-router-hash-link';

// ModelCardRow component
const ModelCardRow = ({ setSelectedModel }) => {
    return (
        <Grid2 container spacing={8} sx={styles.container}>

            {/* Linear Regression Model Card */}
            <Grid2 item>
                <Box
                    onClick={() => setSelectedModel(mlModels.linear)}
                    component={HashLink}
                    to="/#visualisation"
                    smooth
                    sx={styles.link}
                >
                    <ModelCard
                        imgSrc='/img/linear-regression-logo.png'
                        title='Linear Regression'
                        text='Predict continuous outputs from input features.'
                        titleColor='model.linearRegression'
                    />
                </Box>
            </Grid2>

            {/* KNN Classification Model Card */}
            <Grid2 item>
                <Box
                    onClick={() => setSelectedModel(mlModels.knn)}
                    component={HashLink}
                    to="/#visualisation"
                    smooth
                    sx={styles.link}
                >
                    <ModelCard
                        imgSrc='/img/knn-classification-logo.png'
                        title='KNN Classification'
                        text='Forecast trends using past values and noise.'
                        titleColor='model.knn'
                    />
                </Box>
            </Grid2>
            
            {/* K-Means Clustering Model Card */}
            <Grid2 item>
                <Box
                    onClick={() => setSelectedModel(mlModels.kmeans)}
                    component={HashLink}
                    to="/#visualisation"
                    smooth
                    sx={styles.link}
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

// Styles for the ModelCardRow component
const styles = {
    container: {
        marginTop: 12,
        justifyContent: 'center',
        width: '100%',
        padding: 2,
    },
    link: {
        textDecoration: 'none',
        display: 'block',
    },
};

export default ModelCardRow;
