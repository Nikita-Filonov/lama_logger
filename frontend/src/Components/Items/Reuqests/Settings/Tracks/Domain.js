import React from "react";
import {ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {Language} from "@mui/icons-material";
import DomainMenu from "../../../../Menus/Requests/Settings/Tracks/DomainMenu";

export const Domain = ({domain}) =>
  <ListItem divider>
    <ListItemIcon>
      <Language/>
    </ListItemIcon>
    <ListItemText
      primary={'sdfsfdsfsfsd'}
      secondary={'http://localhost:8000/'}
    />
    <ListItemSecondaryAction>
      <DomainMenu/>
    </ListItemSecondaryAction>
  </ListItem>
