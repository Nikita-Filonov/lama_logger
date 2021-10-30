import React from "react";
import {Checkbox, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Tooltip} from "@mui/material";
import {AccessAlarm} from "@mui/icons-material";
import PeriodicTaskMenu from "../../../../Menus/Requests/Settings/PeriodicTasks/PeriodicTaskMenu";
import {useProjectTasks} from "../../../../../Providers/Requests/ProjectTasksProvider";
import {connect} from "react-redux";

const PeriodicTask = ({task, project}) => {
  const {updateTask} = useProjectTasks();

  const onEnable = async () => await updateTask(project.id, task.id, {
    task: {
      id: task?.task?.id,
      enabled: !task?.task?.enabled
    }
  })

  return (
    <ListItem key={task.id} disableGutters divider>
      <ListItemIcon>
        <Tooltip title={task?.task?.enabled ? 'Disable task' : 'Enable task'} placement={'left'}>
          <Checkbox checked={task?.task?.enabled} onClick={onEnable}/>
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
        <PeriodicTaskMenu task={task}/>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  null,
)(PeriodicTask);
