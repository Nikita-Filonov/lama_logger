import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {ProjectMenuStyles} from "../../../Styles/Menus";
import {connect} from "react-redux";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {setRequestsFiltersSidebar} from "../../../Redux/Requests/requestsActions";
import {FilterList, MoreVert} from "@mui/icons-material";

const RequestsMenu = ({setRequestsFiltersSidebar}) => {
  const [menu, setMenu] = useState(null);

  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);

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
      </Menu>
    </React.Fragment>
  );
}

export default connect(
  null,
  {
    setRequestsFiltersSidebar
  },
)(RequestsMenu);
