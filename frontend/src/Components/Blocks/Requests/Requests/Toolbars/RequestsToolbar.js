import React, {useEffect, useMemo, useState} from "react";
import {common, RequestsToolbarStyles, ViewRequestStyles} from "../../../../../Styles/Blocks";
import clsx from "clsx";
import RequestsMenu from "../../../../Menus/Requests/Requests/RequestsMenu";
import {Divider, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import {connect} from "react-redux";
import {setRequestsRealtime, setRequestsTimeFilterModal} from "../../../../../Redux/Requests/Requests/requestsActions";
import {Search} from "../../../Common/Search";
import ProjectSelect from "./ProjectSelect";
import {AccessTime, PauseOutlined, PeopleOutline} from "@mui/icons-material";
import Button from "@mui/material/Button";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import {getTimeFiltersLabel} from "../../../../../Utils/Utils/Formatters";
import {makeRequestsFilters, makeRequestsSearch} from "../../../../../Utils/Utils/Filters";
import {useRequests} from "../../../../../Providers/Requests/RequestsProvider";
import {useUsers} from "../../../../../Providers/Users/UsersProvider";


const RequestsToolbar = (props) => {
  const {
    project,
    requestsPagination,
    setRequestsTimeFilterModal,
    requestsFilters,
    requestsRealtime,
    setRequestsRealtime
  } = props;
  const classes = ViewRequestStyles();
  const {token} = useUsers();
  const {getRequests} = useRequests();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeoutSearch = setTimeout(async () => token &&
      await getRequests(
        project.id,
        requestsPagination.rowsPerPage,
        requestsPagination.rowsPerPage * requestsPagination.page,
        {...makeRequestsFilters(requestsFilters), ...makeRequestsSearch(search)}
      ), 700
    );
    return () => clearTimeout(timeoutSearch);
  }, [token, search]);

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
      <Search
        search={search}
        setSearch={setSearch}
        placeholder={'Search by url'}
      />
      <RequestsMenu/>
    </Paper>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  requestsFilters: state.requests.requestsFilters,
  requestsRealtime: state.requests.requestsRealtime,
  requestsPagination: state.requests.requestsPagination
})

export default connect(
  getState,
  {
    setRequestsRealtime,
    setRequestsTimeFilterModal
  },
)(RequestsToolbar);
