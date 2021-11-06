import React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import {useLocation} from "react-router-dom";
import {Typography} from "@mui/material";
import {ProjectSettingsStyles} from "../../../Styles/Screens";
import {ListItemLink} from "../Common/Navigation/ListItemLink";


export const ProfileSidebar = () => {
  const classes = ProjectSettingsStyles();
  const location = useLocation();

  return (
    <Box className={classes.sidebarContainer} component="nav">
      <Typography className={'mt-4 mb-2'} variant={'h6'}>User profile settings</Typography>
      <List>
        <ListItemLink
          selected={location.pathname.endsWith('/user/profile')}
          title={'Personal info'}
          to={'/user/profile'}
        />
        <ListItemLink
          selected={location.pathname.endsWith('/user/tokens')}
          title={'API Tokens'}
          to={'/user/tokens'}
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
