import React from "react";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListItemText from "@mui/material/ListItemText";
import {Api, Logout, PersonOutline, Settings} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {useHistory, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {DrawerHeaderStyled, DrawerStyled} from "../../../../Styles/Blocks";
import {setRequest} from "../../../../Redux/Requests/Requests/requestsActions";
import {useUsers} from "../../../../Providers/Users/UsersProvider";

const ProjectNavigationDrawer = ({open, onClose, setRequest}) => {
  const history = useHistory();
  const theme = useTheme();
  const location = useLocation();
  const {onLogout} = useUsers();

  const onProjects = () => {
    history.push('/projects')
    setRequest({})
  }
  const onProfile = () => history.push('/user/profile');
  const onIntegrations = () => history.push('/integrations');
  const onSettings = () => history.push('/settings/theme');
  const onLogoutPress = async () => {
    await onLogout();
    history.push('/login');
  }

  return (
    <DrawerStyled variant="permanent" open={open}>
      <DrawerHeaderStyled>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
        </IconButton>
      </DrawerHeaderStyled>
      <Divider/>
      <List>
        <ListItem button onClick={onProjects} selected={location.pathname === '/projects'}>
          <ListItemIcon>
            <FormatListBulletedIcon/>
          </ListItemIcon>
          <ListItemText primary={'Projects'}/>
        </ListItem>
        <ListItem button onClick={onProfile} selected={location.pathname.startsWith('/user')}>
          <ListItemIcon>
            <PersonOutline/>
          </ListItemIcon>
          <ListItemText primary={'Profile'}/>
        </ListItem>
        <ListItem button onClick={onIntegrations} selected={location.pathname.startsWith('/integrations')}>
          <ListItemIcon>
            <Api/>
          </ListItemIcon>
          <ListItemText primary={'Integrations'}/>
        </ListItem>
        <ListItem button onClick={onSettings} selected={location.pathname.startsWith('/settings')}>
          <ListItemIcon>
            <Settings/>
          </ListItemIcon>
          <ListItemText primary={'Settings'}/>
        </ListItem>
        <ListItem button onClick={onLogoutPress}>
          <ListItemIcon>
            <Logout/>
          </ListItemIcon>
          <ListItemText primary={'Logout'}/>
        </ListItem>
      </List>
    </DrawerStyled>
  )
}

export default connect(
  null,
  {
    setRequest
  },
)(ProjectNavigationDrawer);
