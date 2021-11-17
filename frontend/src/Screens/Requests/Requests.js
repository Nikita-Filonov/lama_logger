import React, {useEffect, useRef} from "react";
import _ from "lodash";
import {useRequests} from "../../Providers/Requests/RequestsProvider";
import {connect} from "react-redux";
import RequestsToolbar from "../../Components/Blocks/Requests/Requests/Toolbars/RequestsToolbar";
import {useHistory, useParams} from "react-router-dom";
import RequestsTable from "../../Components/Blocks/Requests/Requests/RequestsTable/RequestsTable";
import RequestsToolbarSelected from "../../Components/Blocks/Requests/Requests/Toolbars/RequestsToolbarSelected";
import TimeFilters from "../../Components/Modals/Requests/Requests/Filters/TimeFilters";
import {Container, Grid} from "@mui/material";
import {makeRequestsFilters} from "../../Utils/Utils/Filters";
import RequestsSideFilters from "../../Components/Blocks/Requests/Requests/RequestsFilters/RequestsSideFilters";
import {RequestsTableSkeletons} from "../../Components/Blocks/Requests/Requests/RequestsTableSkeletons";
import ViewRequestSidePanel from "../../Components/Blocks/Requests/Requests/ViewRequest/ViewRequestSidePanel";
import NodeChain from "../../Components/Modals/Requests/Requests/NodeChain";


const Requests = (props) => {
  const {request, project, viewMode, requestsRealtime, selectedRequests, requestsFilters, requestsPagination} = props;
  const {projectId} = useParams();
  const history = useHistory();
  const requestsInterval = useRef(null);
  const {load, getRequest, getRequests, updateRequestsFilter} = useRequests();

  useEffect(() => {
    (async () => {
      const queryParams = new URLSearchParams(history.location.search)
      queryParams.has('requestId') && await getRequest(project?.id, queryParams.get('requestId'));
    })()
  }, [])

  useEffect(() => {
    (async () => {
      await getRequests(
        projectId,
        requestsPagination.rowsPerPage,
        requestsPagination.rowsPerPage * requestsPagination.page,
        makeRequestsFilters(requestsFilters)
      );
      requestsFilters?.id && await updateRequestsFilter(projectId, requestsFilters?.id, requestsFilters);
    })()
  }, [projectId, requestsFilters, requestsPagination])

  useEffect(() => {
    clearInterval(requestsInterval.current)

    if (requestsRealtime?.enabled) {
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
  }, [projectId, requestsRealtime, requestsFilters, requestsPagination])

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
          <Grid item xs={6}>
            <ViewRequestSidePanel/>
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
      <NodeChain/>
      <TimeFilters/>
    </Container>
  )
}


const getState = (state) => ({
  viewMode: state.users.viewMode,
  request: state.requests.request,
  project: state.projects.project,
  selectedRequests: state.requests.selectedRequests,
  requestsFilters: state.requests.requestsFilters,
  requestsPagination: state.requests.requestsPagination,
  requestsRealtime: state.requests.requestsRealtime
})

export default connect(
  getState,
  null,
)(Requests);
