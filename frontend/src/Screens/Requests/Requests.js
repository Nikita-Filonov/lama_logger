import React, {useEffect, useMemo, useRef} from "react";
import _ from "lodash";
import {useRequests} from "../../Providers/Requests/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/Users/UsersProvider";
import RequestsToolbar from "../../Components/Blocks/Requests/Requests/Toolbars/RequestsToolbar";
import {useParams} from "react-router-dom";
import RequestsTable from "../../Components/Blocks/Requests/Requests/RequestsTable/RequestsTable";
import RequestsToolbarSelected from "../../Components/Blocks/Requests/Requests/Toolbars/RequestsToolbarSelected";
import TimeFilters from "../../Components/Modals/Requests/Requests/Filters/TimeFilters";
import {Container, Grid} from "@mui/material";
import {makeRequestsFilters} from "../../Utils/Utils/Filters";
import RequestsSideFilters from "../../Components/Blocks/Requests/Requests/RequestsFilters/RequestsSideFilters";
import {RequestsTableSkeletons} from "../../Components/Blocks/Requests/Requests/RequestsTableSkeletons";
import ViewRequestSidePanel from "../../Components/Blocks/Requests/Requests/ViewRequest/ViewRequestSidePanel";
import {RequestsTableStyles} from "../../Styles/Blocks";


const Requests = (props) => {
  const classes = RequestsTableStyles();
  const {request, viewMode, requestsRealtime, selectedRequests, requestsFilters, requestsPagination} = props;
  const {projectId} = useParams();
  const requestsInterval = useRef(null);
  const {token} = useUsers();
  const {load, getRequests} = useRequests();

  useEffect(() => {
    (async () => {
      token && await getRequests(
        projectId,
        requestsPagination.rowsPerPage,
        requestsPagination.rowsPerPage * requestsPagination.page,
        makeRequestsFilters(requestsFilters)
      )
    })()
  }, [token, projectId, requestsFilters, requestsPagination])

  useEffect(() => {
    clearInterval(requestsInterval.current)

    if (requestsRealtime?.enabled && token) {
      requestsInterval.current = setInterval(async () => {
        await getRequests(
          projectId,
          requestsPagination.rowsPerPage,
          requestsPagination.rowsPerPage * requestsPagination.page,
          makeRequestsFilters(requestsFilters)
        )
      }, requestsRealtime.normalizedAmount * 1000);
    }

    return () => {
      clearInterval(requestsInterval.current)
    };
  }, [token, projectId, requestsRealtime, requestsFilters, requestsPagination])

  return (
    <Container maxWidth={'xl'}>
      {selectedRequests.length > 0 ? <RequestsToolbarSelected/> : <RequestsToolbar/>}
      <div className={'d-flex mt-3'}>
        <RequestsSideFilters/>
        <Grid container>
          <Grid item xs={(viewMode.requests === 'side' && !_.isEmpty(request)) ? 6 : 12}>
            {load ? <RequestsTableSkeletons/> : <RequestsTable/>}
          </Grid>
          {(viewMode.requests === 'side' && !_.isEmpty(request)) &&
          <Grid item xs={6} className={classes.tableContainer}>
            <ViewRequestSidePanel request={request}/>
          </Grid>}
        </Grid>
      </div>

      {/*<Grid container spacing={4} className={'mt-3'}>*/}
      {/*  <Grid item xs={isRequestSelected ? 6 : 12}>*/}
      {/*    <RequestsTable/>*/}
      {/*  </Grid>*/}
      {/*  {isRequestSelected &&*/}
      {/*  <Grid item xs={6} style={{maxHeight: '75vh', overflow: 'auto', paddingTop: 0}}>*/}
      {/*    <ViewRequest/>*/}
      {/*  </Grid>}*/}
      {/*</Grid>*/}
      <TimeFilters/>
    </Container>
  )
}


const getState = (state) => ({
  viewMode: state.users.viewMode,
  request: state.requests.request,
  selectedRequests: state.requests.selectedRequests,
  requestsFilters: state.requests.requestsFilters,
  requestsPagination: state.requests.requestsPagination,
  requestsRealtime: state.requests.requestsRealtime
})

export default connect(
  getState,
  null,
)(Requests);
