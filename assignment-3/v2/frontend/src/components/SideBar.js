import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText, Box, Drawer } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';

const SideBar = ({ toggleDrawer, drawerOpen }) => {
    return (
        <Drawer
            anchor='left'
            open={drawerOpen}
            onClose={toggleDrawer(false)}
        >
            <Box
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
                sx={styles.box}
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
            </Box>
        </Drawer>
    )
}

const styles = {
    box: {
        width: 250,
        backgroundColor: 'background.paper',
        height: '100vh'
    }
}

export default SideBar