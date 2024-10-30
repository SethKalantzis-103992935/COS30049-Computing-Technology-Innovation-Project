import React from 'react'
import ModelCard from './ModelCard'
import { Grid2, Typography, Box } from '@mui/material'

const ProfileCardRow = () => {
    return (

        <Box sx={styles.container}>
            <Typography variant='h2' align='center' sx={styles.title}>
                Meet the Team
            </Typography>
            <Grid2 container spacing={8} sx={styles.cards}>
                <Grid2 item>
                    <ModelCard
                        imgSrc='\img\matthew-profile.png'
                        title='Matthew Cross'
                        text='Lead Frontend Developer'
                        titleColor='text.primary'
                    />
                </Grid2>
                <Grid2 item>
                    <ModelCard
                        imgSrc='\img\seth-profile.png'
                        title='Seth Kalantzis'
                        text='Lead Model Developer'
                        titleColor='text.primary'
                    />
                </Grid2>
                <Grid2 item>
                    <ModelCard
                        imgSrc='\img\henry-profile.png'
                        title='Henry Richardson'
                        text='Lead Backend Developer'
                        titleColor='text.primary'
                    />
                </Grid2>
            </Grid2>
        </Box>
    )
}

const styles = {
    container: {
        marginTop: 12,
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        color: 'text.primary',
        marginBottom: 6,
    },
    cards: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
};

export default ProfileCardRow