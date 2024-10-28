import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { MenuIcon } from '@mui/icons-material'

const Header = ({ toggleDrawer }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6" 
                    component={Link} 
                    to="/" 
                    sx={{ flexGrow: 1 }}
                >
                    Website Name
                </Typography>
                <Button 
                    color="inherit" 
                    component={Link} 
                    to="/"
                >
                    Home
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