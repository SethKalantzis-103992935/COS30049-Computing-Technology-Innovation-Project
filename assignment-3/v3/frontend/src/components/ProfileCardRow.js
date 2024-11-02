/**
 * ProfileCardRow.js
 * 
 * Author: Matthew Cross (Anti-Pesto Party)
 * Created: October 28, 2024.
 * Last Modified: November 2, 2024.
 * 
 * Purpose:
 * This component displays a row of profile cards for team members, each containing a name, 
 * role, and image. It serves to introduce the team members involved in the project and highlight 
 * their roles.
 */

import React from 'react';
import ModelCard from './ModelCard';
import { Grid2, Box } from '@mui/material';

// ProfileCardRow component
const ProfileCardRow = () => {
    return (
        <Box sx={styles.container}>
            <Grid2 container spacing={8} sx={styles.cards}>

                {/* Matthew Cross Profile Card */}
                <Grid2 item>
                    <ModelCard
                        imgSrc='\img\matthew-profile.png'
                        altImgSrc='\img\matthew-profile-alt.jpg'
                        title='Matthew Cross'
                        text='Lead Frontend Developer'
                        titleColor='text.primary'
                    />
                </Grid2>

                {/* Seth Kalantzis Profile Card */}
                <Grid2 item>
                    <ModelCard
                        imgSrc='\img\seth-profile.jpeg'
                        altImgSrc='\img\seth-profile-alt.jpeg'
                        title='Seth Kalantzis'
                        text='Principal Data Scientist'
                        titleColor='text.primary'
                    />
                </Grid2>

                {/* Henry Richardson Profile Card */}
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
    );
}

// Styles for the ProfileCardRow component
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

export default ProfileCardRow;
