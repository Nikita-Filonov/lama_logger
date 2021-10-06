import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Avatar, Button} from "@material-ui/core";
import {useUsers} from "../../Providers/UsersProvider";
import {AppBarStyled, DrawerHeaderStyled} from "../../Styles/Blocks";
import NavigationDrawer from "./NavigationDrawer";


export const NavigationBar = () => {
  const {onLogout} = useUsers();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && {display: 'none'}),
            }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div" className={'flex-grow-1'}>
            Lama Logger
          </Typography>
          <Avatar className={'me-3'}>N</Avatar>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBarStyled>
      <NavigationDrawer open={open} onClose={handleDrawerClose}/>
      <Box component="main" sx={{flexGrow: 1}}>
        <DrawerHeaderStyled/>
      </Box>
    </Box>
  );
}
