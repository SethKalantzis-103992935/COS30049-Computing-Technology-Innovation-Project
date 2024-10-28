import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <AppBar
            position="fixed"
            disableGutters
            maxWidth={false}
            style={{
                top: 0,
                backgroundColor: '#333',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Button
                        color="inherit"
                        component={Link}
                        to="/linear-regression"

                    >
                        Website Name
                    </Button>
                </Box>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/linear-regression"
                    >
                        Linear Regression
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/arima-time-series"
                    >
                        Arima Time Series
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/knn"
                    >
                        KNN Classification
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/k-means"
                    >
                        K-Means Clustering
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/about"
                    >
                        About
                    </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header