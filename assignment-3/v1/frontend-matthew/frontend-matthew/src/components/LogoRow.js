import React from 'react'
import { Box, Typography } from "@mui/material"
import { Link } from 'react-router-dom'
import Logo from './Logo'

const LogoRow = () => {
    return (
        <Box
            sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "80px",
                width: "100%",
            }}
        >
            <Logo
                src="/img/linear-regression-logo.png"
                titleColor="#e3de8a"
                titleText="Linear Regression"
                bodyText="Predict continuous outputs from input features"
                link={() => "/linear-regression"}
            />
            <Logo
                src="/img/arima-time-series-logo.png"
                titleColor="#71b5bc"
                titleText="Arima Time-Series"
                bodyText="Forecast trends using past values and noise"
                link={() => "/arima-time-series"}
            />
            <Logo
                src="/img/knn-classification-logo.png"
                titleColor="#e7ab43"
                titleText="KNN Classification"
                bodyText="lassify based on nearest neighbor similarity"
                link={() => "/knn"}
            />
            <Logo
                src="/img/k-means-clustering-logo.png"
                titleColor="#dd94b8"
                titleText="K-Means Clustering"
                bodyText="Group data into similar, distinct clusters"
                link={() => "/k-means"}
            />
        </Box>
    )
}

export default LogoRow