import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {CreateOutlined, Delete, MoreHoriz} from "@mui/icons-material";
import {connect} from "react-redux";
import {setConfirmAction} from "../../../../../../Redux/Users/usersActions";
import {useServices} from "../../../../../../Providers/Requests/Tracks/ServicesProvider";
import {setActivity, setChangeActivityModal} from "../../../../../../Redux/Requests/Tracks/tracksActions";
import {usePermissions} from "../../../../../../Providers/Users/PermissionsProvider";
import {ACTIVITY} from "../../../../../../Utils/Permissions/Tracks";


const ActivityMenu = (props) => {
  const {project, activity, setConfirmAction, setActivity, setChangeActivityModal} = props;
  const {isAllowed} = usePermissions();
  const {deleteActivity} = useServices();
  const [menu, setMenu] = useState(null);
  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null)

  const onEdit = () => {
    setActivity(activity);
    setChangeActivityModal(true);
  }

  const onDelete = () => {
    setConfirmAction({
      modal: true,
      title: 'Delete activity',
      description: 'Are you sure you want to delete activity? You will be unable to under this action',
      action: async () => await deleteActivity(project.id, activity.id),
      confirmButton: 'Delete'
    })
  }

  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip title="Activity options">
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
        <MenuItem onClick={onEdit} disabled={!isAllowed([ACTIVITY.update])}>
          <ListItemIcon>
            <CreateOutlined fontSize="small"/>
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem sx={{color: 'red'}} onClick={onDelete} disabled={!isAllowed([ACTIVITY.delete])}>
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
    setActivity,
    setConfirmAction,
    setChangeActivityModal
  },
)(ActivityMenu);
