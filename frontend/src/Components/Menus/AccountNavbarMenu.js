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
import {useUsers} from "../../Providers/Users/UsersProvider";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {capitalize} from "../../Utils/Utils/Common";
import {ListItem, Typography} from "@mui/material";
import {PersonOutline} from "@mui/icons-material";

const AccountNavbarMenu = ({user}) => {
  const {onLogout} = useUsers();
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);

  const onLogoutPress = async () => {
    await onLogout();
    history.push('/login');
  }

  const onProfile = () => history.push('/user/profile');
  const onSettings = () => history.push('/settings/theme');

  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip title="Account settings">
          <IconButton onClick={onOpen} size="small">
            <Avatar sx={{width: 32, height: 32}}>{capitalize(user?.username?.charAt(0))}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={onClose}
        onClick={onClose}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <ListItem>
          <Typography>Welcome, {user?.username}</Typography>
        </ListItem>
        <MenuItem onClick={onProfile}>
          <ListItemIcon>
            <PersonOutline fontSize="small"/>
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider/>
        <MenuItem onClick={onSettings}>
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

const getState = (state) => ({
  user: state.users.user,
})

export default connect(
  getState,
  null,
)(AccountNavbarMenu);
