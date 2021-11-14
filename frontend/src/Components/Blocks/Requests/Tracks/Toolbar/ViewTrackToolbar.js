import React from "react";
import clsx from "clsx";
import {IconButton, Paper, ToggleButton, ToggleButtonGroup, Tooltip} from "@mui/material";
import {ViewRequestStyles} from "../../../../../Styles/Blocks";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import {connect} from "react-redux";
import {setViewMode} from "../../../../../Redux/Users/usersActions";
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import TrackSelect from "./TrackSelect";

const ViewTrackToolbar = (props) => {
  const {viewMode, setViewMode} = props;
  const classes = ViewRequestStyles();

  const onView = (_, nextView) => nextView && setViewMode({...viewMode, requests: nextView});

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex', classes.toolbarContainer)}
    >
      <TrackSelect/>
      <div className={'flex-grow-1'}/>
      <Tooltip title={'New notification'}>
        <IconButton sx={{mr: 2}}>
          <NotificationAddOutlinedIcon/>
        </IconButton>
      </Tooltip>
      <ToggleButtonGroup
        orientation="horizontal"
        value={viewMode?.requests}
        exclusive
        onChange={onView}
        sx={{mr: 2}}
      >
        <ToggleButton value="accordion" aria-label="accordion">
          <Tooltip title={'Accordion view'}>
            <ViewListIcon/>
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="side" aria-label="side">
          <Tooltip title={'Side panel view'}>
            <ViewQuiltIcon/>
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  )
}

const getState = (state) => ({
  viewMode: state.users.viewMode,
})

export default connect(
  getState,
  {
    setViewMode,
  },
)(ViewTrackToolbar);
