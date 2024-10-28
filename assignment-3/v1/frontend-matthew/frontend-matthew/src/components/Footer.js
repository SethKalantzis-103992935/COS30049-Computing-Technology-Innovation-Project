import React from 'react'
import { Box, Typography, Container } from '@mui/material'

const Footer = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Box sx={{ maxHeight: '60px' }}>
                    <img 
                        src="/img/anti-pesto-party-logo.png" 
                        alt="Anti Pesto Part" 
                        style={{ maxHeight: '100%' }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <Typography variant='h6' sx={{ color: '#ffffff', whiteSpace: 'nowrap' }} >
                        Website Name
                    </Typography>
                    <Typography variant='h6' sx={{ color: '#ffffff', whiteSpace: 'nowrap' }} >
                        About
                    </Typography>
                
                </Box>

            </Box>

            <Typography
                variant='body1'
                sx={{
                    color: '#ffffff',
                    whiteSpace: 'nowrap'
                }}
            >
                © 2024. All rights reserved.
            </Typography>
        </Container>
    )
}


export default Footer