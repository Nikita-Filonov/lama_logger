import React from "react";
import {Checkbox, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Tooltip} from "@mui/material";
import {AccessAlarm} from "@mui/icons-material";
import PeriodicTaskMenu from "../../../../Menus/Requests/Settings/PeriodicTasks/PeriodicTaskMenu";

export const PeriodicTask = ({task}) => {
  return (
    <ListItem key={task.id} disableGutters divider>
      <ListItemIcon>
        <Tooltip title={task?.task?.enabled ? 'Disable task' : 'Enable task'} placement={'left'}>
          <Checkbox checked={task?.task?.enabled}/>
        </Tooltip>
      </ListItemIcon>
      <ListItemText
        primary={task?.task?.name}
        secondary={`Every ${task?.task?.interval?.every} ${task?.task?.interval?.period}`}
      />
      <ListItemIcon>
        <AccessAlarm/>
      </ListItemIcon>
      <ListItemSecondaryAction>
        <PeriodicTaskMenu/>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
