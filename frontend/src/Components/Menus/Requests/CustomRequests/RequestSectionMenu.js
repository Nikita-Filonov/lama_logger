import React, {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {connect} from "react-redux";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {MoreVert} from "@mui/icons-material";
import {useHistory} from "react-router-dom";

const RequestSectionMenu = () => {
  const history = useHistory();
  const [menu, setMenu] = useState(null);

  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);

  const onSettings = () => history.push('/settings/json-editor');

  return (
    <React.Fragment>
      <Tooltip title="Request options" placement={'left'}>
        <IconButton size={'small'} onClick={onOpen}>
          <MoreVert fontSize={'small'}/>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={onClose}
        onClick={onClose}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={onSettings}>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small"/>
          </ListItemIcon>
          Settings
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default connect(
  null,
  null,
)(RequestSectionMenu);
