import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import {ContentCopyOutlined, CreateOutlined, MoreHoriz} from "@mui/icons-material";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import {Divider} from "@mui/material";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {setProject} from "../../../Redux/Projects/projectActions";

const ProjectMenu = ({project, setProject}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSettings = () => {
    setProject(project)
    history.push(`/projects/${project.id}/settings/general`)
  }

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
        <MenuItem onClick={onSettings}>
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

export default connect(
  null,
  {
    setProject
  },
)(ProjectMenu);
