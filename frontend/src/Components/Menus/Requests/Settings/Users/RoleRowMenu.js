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

const RoleRowMenu = ({role, setRole, setCreateRoleModal}) => {
  const {isAllowed} = usePermissions();
  const [menu, setMenu] = useState(null);
  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null)

  const onEdit = () => {
    setRole({...role, editMode: true})
    setCreateRoleModal(true)
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
        <MenuItem sx={{color: 'red'}} disabled={!isAllowed([ROLE.delete])}>
          <ListItemIcon>
            <Delete fontSize="small" sx={{color: 'red'}}/>
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default connect(
  null,
  {
    setRole,
    setCreateRoleModal
  },
)(RoleRowMenu);
