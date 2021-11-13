import React, {useState} from "react";
import {common} from "../../../../../Styles/Blocks";
import {METHOD_COLORS} from "../../../../../Utils/Constants";
import {Button, Link, Popover, Stack, Typography} from "@mui/material";
import {ContentCopy, Send} from "@mui/icons-material";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {useAlerts} from "../../../../../Providers/AlertsProvider";
import {requestToCustomRequest} from "../../../../../Utils/Utils/Formatters";
import {useHistory} from "react-router-dom";
import {useCustomRequests} from "../../../../../Providers/Requests/CustomRequestsPorvider";
import {connect} from "react-redux";

const RequestLink = ({request, project}) => {
  const history = useHistory();
  const {setAlert} = useAlerts();
  const {createCustomRequest} = useCustomRequests();
  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const onCopyLink = () => {
    setAlert({message: 'Request url copied to clipboard', level: 'success'});
    closeMenu();
  };

  const onSendRequest = async () => {
    closeMenu();
    const payload = await requestToCustomRequest(request);
    await createCustomRequest(project.id, payload);
    history.push(`/projects/${project.id}/custom-requests`);
  }

  return (
    <React.Fragment>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        className={'mt-2'}
        style={{fontSize: 17, ...common.breakLongWord}}
        color={METHOD_COLORS[request?.method]}
      >
        {request?.method} <Link sx={{ml: 1}} onClick={openMenu}>{request?.requestUrl}</Link>
      </Typography>
      <Popover
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Stack sx={{p: 1}}>
          <CopyToClipboard text={request?.requestUrl} onCopy={onCopyLink}>
            <Button
              size={'small'}
              color={'inherit'}
              startIcon={<ContentCopy/>}
              sx={{justifyContent: 'flex-start'}}
            >
              Copy link
            </Button>
          </CopyToClipboard>
          <Button
            size={'small'}
            color={'inherit'}
            startIcon={<Send/>}
            sx={{justifyContent: 'flex-start'}}
            onClick={onSendRequest}
          >
            Send request
          </Button>
        </Stack>
      </Popover>
    </React.Fragment>
  )
}

const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  null,
)(RequestLink);
