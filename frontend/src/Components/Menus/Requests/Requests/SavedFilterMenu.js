import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import {Check, Close, DeleteOutline, MoreHoriz} from "@mui/icons-material";
import {Divider} from "@mui/material";
import {ProjectMenuStyles} from "../../../../Styles/Menus";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";

const SavedFilterMenu = ({project, request, setConfirmAction}) => {
  const history = useHistory();
  const [menu, setMenu] = useState(null);

  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);
  const onSend = async () => history.push(`/projects/${project.id}/requests/send`);
  const onDelete = async () => {
    setConfirmAction({
      modal: true,
      title: 'Delete request?',
      description: 'Are you sure you want to delete request? You will not be able to restore it later',
      confirmButton: 'Delete',
      action: async () => {
      }
    })
  }

  return (
    <React.Fragment>
      <Box sx={ProjectMenuStyles.boxContainer}>
        <IconButton onClick={onOpen} size="small">
          <MoreHoriz fontSize={'small'}/>
        </IconButton>
      </Box>
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={onClose}
        onClick={onClose}
        transformOrigin={{horizontal: 'left', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={onSend}>
          <ListItemIcon>
            <Check fontSize="small"/>
          </ListItemIcon>
          Select filter
        </MenuItem>
        <MenuItem onClick={onSend}>
          <ListItemIcon>
            <Close fontSize="small"/>
          </ListItemIcon>
          Deselect filter
        </MenuItem>
        <Divider/>
        <MenuItem onClick={onDelete} sx={{color: 'red'}}>
          <ListItemIcon sx={{color: 'red'}}>
            <DeleteOutline fontSize="small"/>
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const getState = (state) => ({
  project: state.projects.project
})

export default connect(
  getState,
  {
    setConfirmAction
  },
)(SavedFilterMenu);
