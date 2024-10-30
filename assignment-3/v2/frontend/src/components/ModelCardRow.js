import React from 'react'
import ModelCard from './ModelCard'
import { Grid2 } from '@mui/material'

const ModelCardRow = () => {
    return (
        <Grid2 container spacing={8} sx={styles.container}>
            <Grid2 item>
                <ModelCard
                    imgSrc='\img\linear-regression-logo.png' 
                    title='Linear Regression' 
                    text='Predict continuous outputs from input features.'
                    titleColor='model.linearRegression' 
                />
            </Grid2>
            <Grid2 item>
                <ModelCard
                    imgSrc='\img\knn-classification-logo.png' 
                    title='KNN Classification' 
                    text='Forecast trends using past values and noise.' 
                    titleColor='model.knn' 
                />
            </Grid2>
            <Grid2 item>
                <ModelCard
                    imgSrc='\img\k-means-clustering-logo.png' 
                    title='K-Mean Clustering' 
                    text='Group data into similar, distinct clusters.' 
                    titleColor='model.kMean' 

                />
            </Grid2>
        </Grid2>
    )
}

const styles = {
    container: {
        marginTop: 12,
        justifyContent: 'center',
        width: '100%',
        padding: 2,
    }
};

export default ModelCardRow