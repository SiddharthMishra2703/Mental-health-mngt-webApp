import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography,ListItemButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({loggedIn}) => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>Mind Care</Typography>
      <List>

        <ListItemButton onClick={() => navigate('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        {
          loggedIn && 
          <>
          <ListItemButton onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate('/messages')}>
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
          </>
        }

        <ListItemButton onClick={() => navigate('/articles')}>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/introduction')}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Introduction" />
        </ListItemButton>

        {
          !loggedIn &&
          <>
          <ListItemButton onClick={() => navigate('/login')}>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate('/signup')}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Signup" />
          </ListItemButton>
          </> 
        }

        {
        loggedIn && 
        <ListItemButton onClick={() => navigate('/logout')}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
        }

      </List>
    </Drawer>
  );
};

export default Sidebar;
