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


export const SettingsSidebar = () => {
  const classes = ProjectSettingsStyles();
  const location = useLocation();
  const [collapse, setCollapse] = useState({customRequests: false});

  useEffect(() => {
    const collapseKey = getMatchesSettingsRoute(location.pathname);
    onCollapse(collapseKey);
  }, [])

  const onCollapse = (key) => setCollapse({...collapse, [key]: !collapse[key]})

  return (
    <Box className={classes.sidebarContainer} component="nav">
      <Typography className={'mt-4 mb-2'} variant={'h6'}>Settings</Typography>
      <List className={classes.sidebarListContainer}>
        <ListItemLink
          selected={location.pathname.endsWith('/settings/theme')}
          to={`/settings/theme`}
          title={'Theme'}
        />
        <ListItem button onClick={() => onCollapse('customRequests')}>
          <ListItemText primary={'Custom requests'}/>
          {collapse.users ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse component="li" in={collapse.customRequests} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemLink
              sx={{pl: 4}}
              to={`/settings/json-editor`}
              title={'Json editor'}
              selected={location.pathname.endsWith('/settings/json-editor')}
            />
            <ListItemLink
              sx={{pl: 4}}
              to={`/settings/headers`}
              title={'Headers'}
              selected={location.pathname.endsWith('/settings/headers')}
            />
          </List>
        </Collapse>
      </List>
    </Box>
  )
}
