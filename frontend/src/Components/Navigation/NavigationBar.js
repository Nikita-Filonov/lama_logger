import React, {useState} from 'react';
import {Box, CssBaseline, IconButton, Toolbar, Typography, useTheme, Zoom} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {AppBarStyled, DrawerHeaderStyled} from "../../Styles/Blocks";
import {connect} from "react-redux";
import {setDrawer, setTheme} from "../../Redux/Users/usersActions";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {NavigationBreadcrumbs} from "./NavigationBreadcrumbs";
import AccountNavbarMenu from "../Menus/AccountNavbarMenu";


const NavigationBar = ({drawer, theme, setTheme, setDrawer, drawerOpen}) => {
  const {palette} = useTheme();
  const [themeButton, setThemeButton] = useState(true);

  const handleDrawerOpen = () => setDrawer(true);
  const handleDrawerClose = () => setDrawer(false);

  const onTheme = async () => {
    setThemeButton(false);
    await setTimeout(() => setThemeButton(true), 200)
    const themeMode = palette.mode === 'light' ? 'dark' : 'light';
    setTheme({...theme, themeMode});
  }

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <AppBarStyled position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(drawerOpen && {display: 'none'}),
            }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div" className={'flex-grow-1'}>
            <NavigationBreadcrumbs/>
          </Typography>
          <IconButton className={'me-3'} onClick={onTheme} color="inherit">
            <Zoom in={themeButton}>
              {palette.mode === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
            </Zoom>
          </IconButton>
          <AccountNavbarMenu/>
        </Toolbar>
      </AppBarStyled>
      {React.createElement(drawer, {open: drawerOpen, onClose: handleDrawerClose})}
      <Box component="main" sx={{flexGrow: 1}}>
        <DrawerHeaderStyled/>
      </Box>
    </Box>
  );
}

const getState = (state) => ({
  theme: state.users.theme,
  drawerOpen: state.users.drawer,
})

export default connect(
  getState,
  {
    setTheme,
    setDrawer
  },
)(NavigationBar);
