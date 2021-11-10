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
import {parseQueryFromUrl} from "../../../../Utils/Utils/Common";
import {copyRequestToCurl} from "../../../../Utils/Api/Curl";

const ViewRequestMenu = ({project, request, setConfirmAction}) => {
  const history = useHistory();
  const {setAlert} = useAlerts();
  const {deleteRequest} = useRequests();
  const {createCustomRequest} = useCustomRequests();
  const [menu, setMenu] = useState(null);

  const onOpen = (event) => setMenu(event.currentTarget);

  const onClose = () => setMenu(null);

  const onCurl = async () => {
    await copyRequestToCurl(request);
    setAlert({message: 'Request copied to clipboard', level: 'success'})
  }
  const onCopyLink = async () => setAlert({message: 'Request url copied to clipboard', level: 'success'});

  const onSend = async () => {
    const requestHeaders = Object.keys(request?.requestHeaders).map(key => ({
      key: key,
      value: request?.requestHeaders[key],
      include: true
    }));
    const queryObject = await parseQueryFromUrl(request?.requestUrl);
    const queryParams = Object.keys(queryObject).map(key => ({key: key, value: queryObject[key], include: true}));
    const payload = {
      requestUrl: request?.requestUrl,
      requestHeaders,
      queryParams,
      requestBody: request?.requestBody,
      method: request?.method,
      isCustom: true
    };
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
        <MenuItem onClick={onSend}>
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
)(ViewRequestMenu);
