import React, {useState} from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import {useLocation} from "react-router-dom";
import {Typography} from "@mui/material";
import {ProjectSettingsStyles} from "../../../Styles/Screens";
import {ListItemLink} from "../Common/Drawers/ListItemLink";


export const ProfileSidebar = () => {
  const classes = ProjectSettingsStyles();
  const location = useLocation();
  const [collapse, setCollapse] = useState({users: false, requests: false});

  const onCollapse = (key) => setCollapse({...collapse, [key]: !collapse[key]})

  return (
    <Box className={classes.sidebarContainer} component="nav">
      <Typography className={'mt-4 mb-2'} variant={'h6'}>User profile settings</Typography>
      <List>
        <ListItemLink
          selected={location.pathname.endsWith('/profile')}
          title={'Personal info'}
        />
        <ListItemLink
          title={'Change password'}
          selected={location.pathname.endsWith('/change-password')}
        />
        <ListItemLink
          title={'My actions'}
          selected={location.pathname.endsWith('/user-actions')}
        />
      </List>
    </Box>
  )
}
