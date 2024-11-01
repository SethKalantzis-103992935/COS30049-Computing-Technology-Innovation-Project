import React, { useState } from 'react'
import { Box } from '@mui/material'
import HeaderAppBar from './HeaderAppBar';

const Header = ({ selectedModel, setSelectedModel }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Box sx={{ width: '100vw' }} >
            <HeaderAppBar 
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
        </Box>
    )
}

export default Header