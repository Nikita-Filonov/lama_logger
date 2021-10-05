import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {DeleteOutline, MoreVert} from "@material-ui/icons";
import {Divider} from "@mui/material";
import {ProjectMenuStyles} from "../../../Styles/Menus";
import {useRequests} from "../../../Providers/RequestsProvider";
import {connect} from "react-redux";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const RequestsMenu = ({project, request}) => {
  const {getRequestAsCurl} = useRequests()
  const [menu, setMenu] = useState(null);

  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);
  const onCurl = async () => {
    await getRequestAsCurl(project.id, request.request_id)
    onClose()
  }

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
        PaperProps={ProjectMenuStyles.paper}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem>
          <ListItemIcon>
            <GroupAddOutlinedIcon fontSize="small"/>
          </ListItemIcon>
          Invite member
        </MenuItem>
        <MenuItem onClick={onCurl}>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small"/>
          </ListItemIcon>
          Project settings
        </MenuItem>
        <Divider/>
        <MenuItem>
          <ListItemIcon>
            <DeleteOutline fontSize="small"/>
          </ListItemIcon>
          Clear all requests
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const getState = (state) => ({
  project: state.projects.project,
  request: state.requests.request
})

export default connect(
  getState,
  null,
)(RequestsMenu);
