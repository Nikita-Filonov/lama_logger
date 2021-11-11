import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {ProjectMenuStyles} from "../../../../Styles/Menus";
import {connect} from "react-redux";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {setRequestsFiltersSidebar} from "../../../../Redux/Requests/Requests/requestsActions";
import {DeleteOutline, FilterList, MoreVert} from "@mui/icons-material";
import {common} from "../../../../Styles/Blocks";
import {usePermissions} from "../../../../Providers/Users/PermissionsProvider";
import {REQUEST} from "../../../../Utils/Permissions/Requests";
import {useRequests} from "../../../../Providers/Requests/RequestsProvider";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";

const RequestsMenu = ({project, setConfirmAction, setRequestsFiltersSidebar}) => {
  const [menu, setMenu] = useState(null);
  const {isAllowed} = usePermissions();
  const {deleteAllRequests} = useRequests();

  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);

  const onClearAllRequests = async () => setConfirmAction({
    modal: true,
    title: 'Clear all requests?',
    description: 'Are you sure you want to delete all requests? You will be unable to restore them',
    confirmButton: 'Delete',
    action: async () => await deleteAllRequests(project.id)
  });

  return (
    <React.Fragment>
      <Box sx={ProjectMenuStyles.boxContainer}>
        <Tooltip title="Request actions" placement={'top'}>
          <IconButton onClick={onOpen} size="small">
            <MoreVert/>
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
        <MenuItem onClick={() => setRequestsFiltersSidebar(false)}>
          <ListItemIcon>
            <FilterList fontSize="small"/>
          </ListItemIcon>
          Filters
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <GroupAddOutlinedIcon fontSize="small"/>
          </ListItemIcon>
          Invite member
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small"/>
          </ListItemIcon>
          Project settings
        </MenuItem>
        <MenuItem style={common.danger} disabled={!isAllowed([REQUEST.delete])} onClick={onClearAllRequests}>
          <ListItemIcon style={common.danger}>
            <DeleteOutline fontSize="small"/>
          </ListItemIcon>
          Clear all requests
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
    setConfirmAction,
    setRequestsFiltersSidebar
  },
)(RequestsMenu);
