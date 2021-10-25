import React, {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {Typography} from "@mui/material";
import {ListItemLink} from "../../Common/Drawers/ListItemLink";
import {getMatchesRequestsSettingsRoute} from "../../../../Utils/Utils/Routing";


const ProjectSettingsSidebar = ({project}) => {
  const classes = ProjectSettingsStyles();
  const location = useLocation();
  const [collapse, setCollapse] = useState({users: false, requests: false, tracks: false});

  useEffect(() => {
    const collapseKey = getMatchesRequestsSettingsRoute(location.pathname);
    onCollapse(collapseKey);
  }, [])

  const onCollapse = (key) => setCollapse({...collapse, [key]: !collapse[key]})

  return (
    <Box className={classes.sidebarContainer} component="nav">
      <Typography className={'mt-4 mb-2'} variant={'h6'}>Settings</Typography>
      <List className={classes.sidebarListContainer}>
        <ListItemLink
          selected={location.pathname.endsWith('/settings/general')}
          to={`/projects/${project.id}/settings/general`}
          title={'General'}
        />
        <ListItemLink
          selected={location.pathname.endsWith('/settings/notifications')}
          to={`/projects/${project.id}/settings/notifications`}
          title={'Notifications'}
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
              to={`/projects/${project.id}/settings/filters`}
              title={'Filters'}
              selected={location.pathname.endsWith('/settings/filters')}
            />
            <ListItemLink
              sx={{pl: 4}}
              to={`/projects/${project.id}/settings/realtime`}
              title={'Realtime updates'}
              selected={location.pathname.endsWith('/settings/realtime')}
            />
            <ListItemLink
              sx={{pl: 4}}
              to={`/projects/${project.id}/settings/roles`}
              title={'Auto deletion'}
              selected={location.pathname.endsWith('/settings/roles')}
            />
          </List>
        </Collapse>
        <ListItem button onClick={() => onCollapse('tracks')}>
          <ListItemText primary={'Tracks'}/>
          {collapse.tracks ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse component="li" in={collapse.tracks} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemLink
              sx={{pl: 4}}
              to={`/projects/${project.id}/settings/activities`}
              title={'Activities'}
              selected={location.pathname.endsWith('/settings/activities')}
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
