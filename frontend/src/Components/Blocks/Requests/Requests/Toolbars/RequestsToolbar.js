import React, {useMemo, useState} from "react";
import {common, RequestsToolbarStyles, ViewRequestStyles} from "../../../../../Styles/Blocks";
import clsx from "clsx";
import RequestsMenu from "../../../../Menus/Requests/Requests/RequestsMenu";
import {Divider, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import {connect} from "react-redux";
import {setRequestsRealtime, setRequestsTimeFilterModal} from "../../../../../Redux/Requests/Requests/requestsActions";
import ProjectSelect from "./ProjectSelect";
import {AccessTime, PauseOutlined, PeopleOutline} from "@mui/icons-material";
import Button from "@mui/material/Button";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import {getTimeFiltersLabel} from "../../../../../Utils/Utils/Formatters";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ViewListIcon from '@mui/icons-material/ViewList';


const RequestsToolbar = (props) => {
  const {
    setRequestsTimeFilterModal,
    requestsFilters,
    requestsRealtime,
    setRequestsRealtime
  } = props;
  const classes = ViewRequestStyles();
  const [view, setView] = useState('list');

  const onView = (_, nextView) => setView(nextView);
  const timeFiltersLabel = useMemo(() => getTimeFiltersLabel(requestsFilters?.time), [requestsFilters?.time])
  const onTimeFilters = () => setRequestsTimeFilterModal(true);
  const onRealtime = () => setRequestsRealtime({...requestsRealtime, enabled: !requestsRealtime?.enabled});

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex', classes.toolbarContainer)}
    >
      <ProjectSelect/>
      <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
      <Button startIcon={<AccessTime/>} color={'inherit'} onClick={onTimeFilters}
              style={RequestsToolbarStyles.timeFiltersButton}>
        <Typography style={common.ellipsisText}>{timeFiltersLabel}</Typography>
      </Button>
      <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
      <Button startIcon={<PeopleOutline/>} color={'inherit'} onClick={onTimeFilters}>
        Members filters
      </Button>
      <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
      <Tooltip title={(requestsRealtime ? 'Disable' : 'Enable') + ' realtime updates'}>
        <IconButton onClick={onRealtime}>
          {requestsRealtime?.enabled ? <PauseOutlined/> : <PlayArrowOutlinedIcon/>}
        </IconButton>
      </Tooltip>
      <div className={'flex-grow-1'}/>
      <ToggleButtonGroup
        orientation="horizontal"
        value={view}
        exclusive
        onChange={onView}
        sx={{mr: 2}}
      >
        <ToggleButton value="list" aria-label="list">
          <ViewListIcon/>
        </ToggleButton>
        <ToggleButton value="quilt" aria-label="quilt">
          <ViewQuiltIcon/>
        </ToggleButton>
      </ToggleButtonGroup>
      <RequestsMenu/>
    </Paper>
  )
}

const getState = (state) => ({
  requestsFilters: state.requests.requestsFilters,
  requestsRealtime: state.requests.requestsRealtime,
})

export default connect(
  getState,
  {
    setRequestsRealtime,
    setRequestsTimeFilterModal
  },
)(RequestsToolbar);
