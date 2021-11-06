import React, {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {useLocation} from "react-router-dom";
import {Typography} from "@mui/material";
import {ProjectSettingsStyles} from "../../../Styles/Screens";
import {ListItemLink} from "../Common/Navigation/ListItemLink";
import {getMatchesSettingsRoute} from "../../../Utils/Utils/Routing";


export const SettingsSidebar = ({project = 1}) => {
  const classes = ProjectSettingsStyles();
  const location = useLocation();
  const [collapse, setCollapse] = useState({customRequests: false, theme: false});

  useEffect(() => {
    const collapseKey = getMatchesSettingsRoute(location.pathname);
    onCollapse(collapseKey);
  }, [])

  const onCollapse = (key) => setCollapse({...collapse, [key]: !collapse[key]})

  return (
    <Box className={classes.sidebarContainer} component="nav">
      <Typography className={'mt-4 mb-2'} variant={'h6'}>Project settings</Typography>
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
        <Collapse component="li" in={collapse.customRequests} timeout="auto" unmountOnExit>
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
      </List>
    </Box>
  )
}
