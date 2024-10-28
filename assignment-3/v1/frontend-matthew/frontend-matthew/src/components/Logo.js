import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

const Logo = ({ src, titleColor, titleText, bodyText, link }) => {
    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "100%",
                    width: "100%",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                    '&:hover': {
                        transform: "scale(1.05)"
                    }
                }}
            >
                <Box
                    component="img"
                    src={src}
                    alt="Linear Regression Logo"
                    sx={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        aspectRatio: "1/1"
                    }}
                />
                <Typography variant="h6" sx={{ color: titleColor, marginTop: "20px" }}>
                    {titleText}
                </Typography>
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                    {bodyText}
                </Typography>
            </Box>
        </Link>
    )
}

export default Logo