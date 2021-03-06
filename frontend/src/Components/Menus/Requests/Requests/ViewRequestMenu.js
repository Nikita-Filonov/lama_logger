import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {ContentCopy, DeleteOutline, InsertLink, MoreVert, Send} from "@mui/icons-material";
import {Divider} from "@mui/material";
import {ProjectMenuStyles} from "../../../../Styles/Menus";
import {useRequests} from "../../../../Providers/Requests/RequestsProvider";
import {connect} from "react-redux";
import {useAlerts} from "../../../../Providers/AlertsProvider";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useHistory} from "react-router-dom";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";
import {useCustomRequests} from "../../../../Providers/Requests/CustomRequestsPorvider";
import {copyRequestToCurl} from "../../../../Utils/Api/Curl";
import {usePermissions} from "../../../../Providers/Users/PermissionsProvider";
import {common} from "../../../../Styles/Blocks";
import {REQUEST} from "../../../../Utils/Permissions/Requests";
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import {setRequestsNodeChainModal} from "../../../../Redux/Requests/Requests/requestsActions";
import {requestToCustomRequest} from "../../../../Utils/Utils/Formatters";

const ViewRequestMenu = ({project, request, setConfirmAction, setRequestsNodeChainModal}) => {
  const history = useHistory();
  const {isAllowed} = usePermissions();
  const {setAlert} = useAlerts();
  const {deleteRequest, getRequestsChain} = useRequests();
  const {createCustomRequest} = useCustomRequests();
  const [menu, setMenu] = useState(null);

  const onOpen = (event) => setMenu(event.currentTarget);

  const onClose = () => setMenu(null);

  const onNodeChain = async () => {
    if (!request?.node) {
      setAlert({message: 'We unable to chain this request. Because he not connected to any node', level: 'warning'});
      return;
    }
    await getRequestsChain(project?.id, request?.nodeId);
    setRequestsNodeChainModal(true);
  }

  const onCurl = async () => {
    await copyRequestToCurl(request);
    setAlert({message: 'Request copied to clipboard', level: 'success'})
  }
  const onCopyLink = async () => setAlert({message: 'Request url copied to clipboard', level: 'success'});

  const onSend = async () => {
    const payload = await requestToCustomRequest(request);
    await createCustomRequest(project.id, payload);
    history.push(`/projects/${project.id}/custom-requests`);
  };

  const onDelete = async () => {
    setConfirmAction({
      modal: true,
      title: 'Delete request?',
      description: 'Are you sure you want to delete request? You will not be able to restore it later',
      confirmButton: 'Delete',
      action: async () => await deleteRequest(project.id, request?.requestId)
    });
  };

  return (
    <React.Fragment>
      <Box sx={ProjectMenuStyles.boxContainer}>
        <Tooltip title="Request actions" placement={'top'}>
          <IconButton onClick={onOpen} size="small">
            <MoreVert fontSize={'small'}/>
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
        <MenuItem onClick={onNodeChain}>
          <ListItemIcon>
            <PlaylistPlayOutlinedIcon fontSize="small"/>
          </ListItemIcon>
          Node chain
        </MenuItem>
        <MenuItem onClick={onSend} disabled={!isAllowed([REQUEST.create])}>
          <ListItemIcon>
            <Send fontSize="small"/>
          </ListItemIcon>
          Send
        </MenuItem>
        <MenuItem onClick={onCurl}>
          <ListItemIcon>
            <InsertLink fontSize="small"/>
          </ListItemIcon>
          Copy as curl
        </MenuItem>
        <CopyToClipboard text={window.location.href} onCopy={onCopyLink}>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small"/>
            </ListItemIcon>
            Copy request link
          </MenuItem>
        </CopyToClipboard>
        <Divider/>
        <MenuItem onClick={onDelete} sx={common.danger} disabled={!isAllowed([REQUEST.delete])}>
          <ListItemIcon sx={common.danger}>
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
    setConfirmAction,
    setRequestsNodeChainModal
  },
)(ViewRequestMenu);
