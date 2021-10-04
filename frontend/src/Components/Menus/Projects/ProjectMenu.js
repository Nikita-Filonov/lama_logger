import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import {CreateOutlined, MoreHoriz} from "@material-ui/icons";
import {ContentCopyOutlined} from "@mui/icons-material";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import {Divider} from "@mui/material";
import {ProjectMenuStyles} from "../../../Styles/Menus";

export const ProjectMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip title="Project options">
          <IconButton onClick={handleClick} size="small" sx={{ml: 2}}>
            <MoreHoriz/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={ProjectMenuStyles.paper}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem>
          <ListItemIcon>
            <CreateOutlined fontSize="small"/>
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopyOutlined fontSize="small"/>
          </ListItemIcon>
          Duplicate
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small"/>
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider/>
        <MenuItem>
          <ListItemIcon>
            <ArchiveOutlinedIcon fontSize="small"/>
          </ListItemIcon>
          Archive
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
