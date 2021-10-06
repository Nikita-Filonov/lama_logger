import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {DeleteOutline, FilterList, MoreVert} from "@material-ui/icons";
import {Divider} from "@mui/material";
import {ProjectMenuStyles} from "../../../Styles/Menus";
import {useRequests} from "../../../Providers/RequestsProvider";
import {connect} from "react-redux";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {setRequestsFiltersSidebar} from "../../../Redux/Requests/requestsActions";

const RequestsMenu = ({project, requests, setRequestsFiltersSidebar}) => {
  const [menu, setMenu] = useState(null);
  const {deleteRequests} = useRequests()

  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);
  const onClear = async () => {
    const requestsToDelete = requests.map(r => r.id)
    await deleteRequests(project.id, requestsToDelete)
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
        <Divider/>
        <MenuItem onClick={onClear}>
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
  requests: state.requests.requests,
})

export default connect(
  getState,
  {
    setRequestsFiltersSidebar
  },
)(RequestsMenu);
