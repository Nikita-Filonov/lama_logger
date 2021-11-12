import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {CreateOutlined, Delete, MoreHoriz} from "@mui/icons-material";
import {connect} from "react-redux";
import {setCreateRoleModal, setRole} from "../../../../../Redux/Requests/Settings/requestsSettingsActions";
import {usePermissions} from "../../../../../Providers/Users/PermissionsProvider";
import {ROLE} from "../../../../../Utils/Permissions/Projects";
import {setConfirmAction} from "../../../../../Redux/Users/usersActions";
import {useProjects} from "../../../../../Providers/ProjectsProvider";


const RoleRowMenu = ({role, setRole, project, setCreateRoleModal, setConfirmAction}) => {
  const {isAllowed} = usePermissions();
  const {deleteRole} = useProjects();
  const [menu, setMenu] = useState(null);
  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null)

  const onEdit = () => {
    setRole({...role, editMode: true});
    setCreateRoleModal(true);
  };

  const onDelete = async () => {
    setConfirmAction({
      modal: true,
      title: 'Delete role?',
      description: 'Are you sure you want to delete role? ' +
        'You will not be able to undo this action',
      confirmButton: 'Delete',
      action: async () => await deleteRole(project?.id, role?.id)
    })
  }

  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip title="Project options">
          <IconButton onClick={onOpen} size="small" sx={{ml: 2}}>
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
        <MenuItem onClick={onEdit} disabled={!isAllowed([ROLE.update])}>
          <ListItemIcon>
            <CreateOutlined fontSize="small"/>
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem sx={{color: 'red'}} disabled={!isAllowed([ROLE.delete])} onClick={onDelete}>
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
    setRole,
    setCreateRoleModal,
    setConfirmAction
  },
)(RoleRowMenu);
