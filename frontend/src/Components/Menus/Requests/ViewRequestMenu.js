import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {ContentCopy, DeleteOutline, InsertLink, MoreVert, Send} from "@mui/icons-material";
import {Divider} from "@mui/material";
import {ProjectMenuStyles} from "../../../Styles/Menus";
import {useRequests} from "../../../Providers/Requests/RequestsProvider";
import {connect} from "react-redux";
import {useAlerts} from "../../../Providers/AlertsProvider";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ViewRequestMenu = ({project, request}) => {
  const {setAlert} = useAlerts();
  const {getRequestAsCurl} = useRequests();
  const [menu, setMenu] = useState(null);

  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);
  const onCurl = async () => {
    await getRequestAsCurl(project.id, request.request_id)
    onClose()
  }
  const onCopyLink = async () => setAlert({message: 'Request url copied to clipboard'})


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
        <MenuItem>
          <ListItemIcon>
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
  null,
)(ViewRequestMenu);
