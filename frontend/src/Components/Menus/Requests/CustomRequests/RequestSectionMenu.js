import React, {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {connect} from "react-redux";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import {MoreVert, PersonOutline} from "@mui/icons-material";
import {useHistory} from "react-router-dom";
import {ShareRequestsInfo} from "../../../Modals/Requests/CustomRequests/ShareRequestsInfo";
import ShareRequests from "../../../Modals/Requests/CustomRequests/ShareRequests";

const RequestSectionMenu = () => {
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const [shareRequestsModal, setShareRequestsModal] = useState(false);
  const [shareRequestsInfoModel, setShareRequestsInfoModal] = useState(false);

  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);

  const onSettings = () => history.push('/settings/json-editor');

  const onShareRequests = () => localStorage.getItem('shareRequestsInfo')
    ? setShareRequestsModal(true)
    : setShareRequestsInfoModal(true)

  const onAcceptShareInfo = () => {
    setShareRequestsInfoModal(false);
    localStorage.setItem('shareRequestsInfo', 'true');
    setShareRequestsModal(true)
  };


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
        <MenuItem disabled onClick={onShareRequests}>
          <ListItemIcon>
            <GroupAddOutlinedIcon/>
          </ListItemIcon>
          Share my requests
        </MenuItem>
        <MenuItem disabled onClick={onShareRequests}>
          <ListItemIcon>
            <PersonOutline/>
          </ListItemIcon>
          Shared with me
        </MenuItem>
      </Menu>
      <ShareRequests modal={shareRequestsModal} setModal={setShareRequestsModal}/>
      <ShareRequestsInfo
        modal={shareRequestsInfoModel}
        setModal={setShareRequestsInfoModal}
        onAcceptShareInfo={onAcceptShareInfo}
      />
    </React.Fragment>
  );
}

export default connect(
  null,
  null,
)(RequestSectionMenu);
