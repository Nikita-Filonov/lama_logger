import React from "react";
import {IconButton, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {MoreVert} from "@mui/icons-material";

export const RecentRequests = () => {
  return (
    <Paper elevation={3} sx={{p: 1, pl: 1.5}}>
      <div className={'d-flex'}>
        <Typography>Requests</Typography>
        <div className={'flex-grow-1'}/>
        <IconButton size={'small'}>
          <MoreVert fontSize={'small'}/>
        </IconButton>
      </div>
      <List dense>
        <ListItem divider disableGutters>
          <ListItemText primary={'POST http://localhost:8000/'}/>
        </ListItem>
        <ListItem divider disableGutters>
          <ListItemText primary={'POST http://localhost:8000/'}/>
        </ListItem>
        <ListItem divider disableGutters>
          <ListItemText primary={'POST http://localhost:8000/'}/>
        </ListItem>
        <ListItem divider disableGutters>
          <ListItemText primary={'POST http://localhost:8000/'}/>
        </ListItem>
      </List>
    </Paper>
  )
}
