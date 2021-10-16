import React, {useState} from 'react';
import {Box, CssBaseline, IconButton, Toolbar, Typography, useTheme} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {AppBarStyled, DrawerHeaderStyled} from "../../Styles/Blocks";
import {connect} from "react-redux";
import {setTheme} from "../../Redux/Users/usersActions";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {NavigationBreadcrumbs} from "./NavigationBreadcrumbs";
import {AccountNavbarMenu} from "../Menus/AccountNavbarMenu";


const NavigationBar = ({drawer, setTheme}) => {
  const {palette} = useTheme();
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
            <NavigationBreadcrumbs/>
          </Typography>
          <IconButton className={'me-3'} onClick={onTheme} color="inherit">
            {palette.mode === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
          </IconButton>
          <AccountNavbarMenu/>
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
