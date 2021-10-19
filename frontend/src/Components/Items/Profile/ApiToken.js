import React from "react";
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import moment from "moment";
import {Delete} from "@mui/icons-material";

export const ApiToken = ({token}) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={token.name}
        secondary={moment(token.created).fromNow()}
      />
      <ListItemSecondaryAction>
        <IconButton size={'small'}>
          <Delete/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
