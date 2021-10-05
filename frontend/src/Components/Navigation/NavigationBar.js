import React, {useState} from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Avatar, Button} from "@material-ui/core";
import {useUsers} from "../../Providers/UsersProvider";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {Api, Logout} from "@mui/icons-material";
import {Settings} from "@material-ui/icons";
import {AppBarStyled, DrawerHeaderStyled, DrawerStyled} from "../../Styles/Blocks";
import {deepOrange} from "@material-ui/core/colors";


export const NavigationBar = () => {
  const {onLogout} = useUsers();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeaderStyled>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
          </IconButton>
        </DrawerHeaderStyled>
        <Divider/>
        <List>
          <ListItem button>
            <ListItemIcon>
              <FormatListBulletedIcon/>
            </ListItemIcon>
            <ListItemText primary={'Projects'}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Api/>
            </ListItemIcon>
            <ListItemText primary={'API'}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings/>
            </ListItemIcon>
            <ListItemText primary={'Settings'}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Logout/>
            </ListItemIcon>
            <ListItemText primary={'Logout'}/>
          </ListItem>
        </List>
      </DrawerStyled>
      <Box component="main" sx={{flexGrow: 1}}>
        <DrawerHeaderStyled/>
      </Box>
    </Box>
  );
}
