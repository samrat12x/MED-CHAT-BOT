import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import TeamHeader from './TeamHeader';
import ChatInterface from './ChatInterface';


const drawerWidth = 280;

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex'  , height:'100vh'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
          SwasthCare
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          }, '& button': { m: 1 }
        }}
        variant="permanent"
        anchor="left"
      >
        <TeamHeader/>   

        <Divider />
        <Button  size="large"  variant="contained"  startIcon={<AddCircleOutlineSharpIcon />}>New Chat</Button>
        <Divider />
        <List>
          {['Chat 1', 'Chat 2', 'Chat 3', 'Chat 4'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
          {/* horizontal line break */}
        
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
<ChatInterface/>        
      </Box>
    </Box>
  );
}
