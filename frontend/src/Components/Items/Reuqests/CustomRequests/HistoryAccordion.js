import React, {useState} from "react";
import {
  Collapse,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip
} from "@mui/material";
import {DeleteOutline, Event, ExpandLess, ExpandMore, MoreHoriz} from "@mui/icons-material";
import List from "@mui/material/List";
import {METHOD_COLORS} from "../../../../Utils/Constants";
import {common} from "../../../../Styles/Blocks";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {toCalendarWithoutTime} from "../../../../Utils/Utils/Formatters";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {useCustomRequests} from "../../../../Providers/Requests/CustomRequestsPorvider";


const HistoryAccordion = ({history, project, customRequests, setCustomRequest}) => {
  const [open, setOpen] = useState(true);
  const [action, setAction] = useState(false);
  const {createCustomRequest} = useCustomRequests();

  const onOpen = () => setOpen(!open);
  const onActionShow = () => setAction(true);
  const onActionHide = () => setAction(false);

  const onSelectRequest = async (request) => {
    const existingRequest = customRequests?.results?.find(r => r.requestId === request.requestId)
    if (existingRequest) {
      setCustomRequest(existingRequest);
    } else {
      await createCustomRequest(project.id, {...request, isCustom: true});
    }
  }

  return (
    <React.Fragment>
      <ListItemButton
        disableGutters
        onClick={onOpen}
        onMouseEnter={onActionShow}
        onMouseLeave={onActionHide}
      >
        <ListItemIcon sx={{ml: 0.2}}>
          <Event fontSize={'small'}/>
        </ListItemIcon>
        <ListItemText primary={toCalendarWithoutTime(history?.created)}/>
        {action && <Tooltip title={'Delete history'} placement={'left'}>
          <IconButton size={'small'} sx={{p: 0.5}}>
            <DeleteOutline fontSize={'small'}/>
          </IconButton>
        </Tooltip>}
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {history?.data?.map(request =>
            <ListItem
              key={request.id}
              button
              divider
              disableGutters
              onClick={async () => await onSelectRequest(request)}
            >
              <Grid container spacing={2}>
                <Grid item xs={2} md={2} lg={2} xl={2} sm={2}>
                  <Typography color={METHOD_COLORS[request?.method]} sx={{mr: 2}}>{request?.method}</Typography>
                </Grid>
                <Grid item xs={10} md={10} lg={10} xl={10} sm={10}>
                  <Typography style={common.ellipsisText}>{request?.requestUrl}</Typography>
                </Grid>
              </Grid>
              <ListItemSecondaryAction>
                <IconButton size={'small'}>
                  <MoreHoriz fontSize={'small'}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </Collapse>
    </React.Fragment>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  customRequests: state.customRequests.customRequests,
})

export default connect(
  getState,
  {
    setCustomRequest
  },
)(HistoryAccordion);
