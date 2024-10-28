import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, Divider, Box, Switch } from '@mui/material'
import { HomeIcon, InfoIcon } from '@mui/icons-material'

const SideBar = ({ toggleDrawer, darkMode, handleDarkModeToggle }) => {
  return (
    <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        sx={{
            width: 250,
            backgroundColor: 'background.paper',
            height: '100vh'
        }}
    >
        <List>
            <ListItem 
                button 
                component={Link} 
                key={'Home'}
                to="/"
            >
                <HomeIcon />
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem
                button
                component={Link}
                key={'About'}
                to="/about"
            >
                <InfoIcon />
                <ListItemText primary="About" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem 
                button 
            >
                <ListItemText primary="Dark Mode" />
                <Switch 
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                />
            </ListItem>
        </List>
    </Box>
  )
}

export default SideBar