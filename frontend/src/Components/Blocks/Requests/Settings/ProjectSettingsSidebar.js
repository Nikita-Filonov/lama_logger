import React, {useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {Typography} from "@mui/material";

function ListItemLink(props) {
  const {to, open, title, ...other} = props;

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess/> : <ExpandMore/>;
  }

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={title}/>
        {icon}
      </ListItem>
    </li>
  );
}

const ProjectSettingsSidebar = ({project}) => {
  const classes = ProjectSettingsStyles();
  const location = useLocation();
  const [collapse, setCollapse] = useState({users: false, requests: false});

  const onCollapse = (key) => setCollapse({...collapse, [key]: !collapse[key]})

  return (
    <Box className={classes.sidebarContainer} component="nav">
      <Typography className={'mt-4 mb-2'} variant={'h6'}>Settings</Typography>
      <List>
        <ListItemLink
          selected={location.pathname.endsWith('/settings/general')}
          to={`/projects/${project.id}/settings/general`}
          title={'General'}
        />
        <ListItem button onClick={() => onCollapse('users')}>
          <ListItemText primary={'Users'}/>
          {collapse.users ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse component="li" in={collapse.users} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemLink
              sx={{pl: 4}}
              to={`/projects/${project.id}/settings/members`}
              title={'Members'}
              selected={location.pathname.endsWith('/settings/members')}
            />
            <ListItemLink
              sx={{pl: 4}}
              to={`/projects/${project.id}/settings/roles`}
              title={'Roles'}
              selected={location.pathname.endsWith('/settings/roles')}
            />
          </List>
        </Collapse>
        <ListItem button onClick={() => onCollapse('requests')}>
          <ListItemText primary={'Requests'}/>
          {collapse.requests ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse component="li" in={collapse.requests} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemLink
              sx={{pl: 4}}
              to={`/projects/${project.id}/settings/inbound`}
              title={'Inbound data filters'}
              selected={location.pathname.endsWith('/settings/inbound')}
            />
            <ListItemLink
              sx={{pl: 4}}
              to={`/projects/${project.id}/settings/members`}
              title={'Filters'}
              selected={location.pathname.endsWith('/settings/members')}
            />
            <ListItemLink
              sx={{pl: 4}}
              to={`/projects/${project.id}/settings/roles`}
              title={'Auto deletion'}
              selected={location.pathname.endsWith('/settings/roles')}
            />
          </List>
        </Collapse>
        <ListItemLink
          to={`/projects/${project.id}/settings/integrations`}
          title={'Integrations'}
          selected={location.pathname.endsWith('/settings/integrations')}
        />
      </List>
    </Box>
  )
}


const getState = (state) => ({
  project: state.projects.project
})

export default connect(
  getState,
  null,
)(ProjectSettingsSidebar);
