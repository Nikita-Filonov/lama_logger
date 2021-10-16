import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {useUsers} from "../../Providers/UsersProvider";
import {useHistory} from "react-router-dom";

export const AccountNavbarMenu = () => {
  const {onLogout} = useUsers();
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);

  const onLogoutPress = async () => {
    await onLogout()
    history.push('/login')
  }

  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip title="Account settings">
          <IconButton onClick={onOpen} size="small">
            <Avatar sx={{width: 32, height: 32}}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={onClose}
        onClick={onClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem>
          <Avatar/> Profile
        </MenuItem>
        <Divider/>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small"/>
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={onLogoutPress}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
