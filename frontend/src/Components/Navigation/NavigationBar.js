import React, {useState} from 'react';
import {Avatar, Box, Button, CssBaseline, IconButton, Toolbar, Typography, useTheme} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useUsers} from "../../Providers/UsersProvider";
import {AppBarStyled, DrawerHeaderStyled} from "../../Styles/Blocks";
import {connect} from "react-redux";
import {setTheme} from "../../Redux/Users/usersActions";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const NavigationBar = ({drawer, setTheme}) => {
  const {palette} = useTheme();
  const {onLogout} = useUsers();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const onTheme = () => {
    const theme = palette.mode === 'light' ? 'dark' : 'light'
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }

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
          <IconButton className={'me-3'} onClick={onTheme} color="inherit">
            {palette.mode === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
          </IconButton>
          <Avatar className={'me-3'}>N</Avatar>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBarStyled>
      {React.createElement(drawer, {open: open, onClose: handleDrawerClose})}
      <Box component="main" sx={{flexGrow: 1}}>
        <DrawerHeaderStyled/>
      </Box>
    </Box>
  );
}

export default connect(
  null,
  {
    setTheme
  },
)(NavigationBar);
