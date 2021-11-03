import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {CreateOutlined, Delete, MoreHoriz} from "@mui/icons-material";
import {connect} from "react-redux";
import {useProjectTasks} from "../../../../../Providers/Requests/ProjectTasksProvider";
import {setConfirmAction} from "../../../../../Redux/Users/usersActions";
import {setCreateTaskModal, setPeriodicTask} from "../../../../../Redux/Requests/Settings/requestsSettingsActions";
import {usePermissions} from "../../../../../Providers/Users/PermissionsProvider";
import {PROJECT_TASKS} from "../../../../../Utils/Permissions/Projects";


const PeriodicTaskMenu = (props) => {
  const {project, task, setConfirmAction, setCreateTaskModal, setPeriodicTask} = props;
  const {isAllowed} = usePermissions();
  const {deleteTask} = useProjectTasks();
  const [menu, setMenu] = useState(null);
  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null)

  const onEdit = () => {
    setPeriodicTask({...task.task, editMode: true, taskId: task.id});
    setCreateTaskModal(true);
  }

  const onDelete = () => {
    setConfirmAction({
      modal: true,
      title: 'Delete task',
      description: 'Are you sure you want to delete task? You will be unable to under this action',
      action: async () => await deleteTask(project.id, task.id),
      confirmButton: 'Delete'
    })
  }

  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip title="Task options">
          <IconButton onClick={onOpen}>
            <MoreHoriz/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={onClose}
        onClick={onClose}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={onEdit} disabled={!isAllowed([PROJECT_TASKS.update])}>
          <ListItemIcon>
            <CreateOutlined fontSize="small"/>
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem sx={{color: 'red'}} onClick={onDelete} disabled={!isAllowed([PROJECT_TASKS.delete])}>
          <ListItemIcon>
            <Delete fontSize="small" sx={{color: 'red'}}/>
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  {
    setPeriodicTask,
    setConfirmAction,
    setCreateTaskModal
  },
)(PeriodicTaskMenu);
