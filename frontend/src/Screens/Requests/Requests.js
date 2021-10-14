import React, {useEffect, useRef} from "react";
import {useRequests} from "../../Providers/Requests/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import RequestsToolbar from "../../Components/Blocks/Requests/Requests/Toolbars/RequestsToolbar";
import {useParams} from "react-router-dom";
import RequestsTable from "../../Components/Blocks/Requests/Requests/RequestsTable/RequestsTable";
import RequestsToolbarSelected from "../../Components/Blocks/Requests/Requests/Toolbars/RequestsToolbarSelected";
import TimeFilters from "../../Components/Modals/Requests/Requests/Filters/TimeFilters";
import {Container} from "@mui/material";
import {makeRequestsFilters} from "../../Utils/Untils/Filters";
import RequestsSideFilters from "../../Components/Blocks/Requests/Requests/RequestsFilters/RequestsSideFilters";
import {RequestsTableSkeletons} from "../../Components/Blocks/Requests/Requests/RequestsTableSkeletons";


const Requests = (props) => {
  const {requestsRealtime, selectedRequests, requestsFilters, requestsPagination} = props;
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

    if (requestsRealtime && token) {
      requestsInterval.current = setInterval(async () => {
        await getRequests(
          projectId,
          requestsPagination.rowsPerPage,
          requestsPagination.rowsPerPage * requestsPagination.page,
          makeRequestsFilters(requestsFilters)
        )
      }, 10000);
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
        {load ? <RequestsTableSkeletons/> : <RequestsTable/>}
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
  selectedRequests: state.requests.selectedRequests,
  requestsFilters: state.requests.requestsFilters,
  requestsPagination: state.requests.requestsPagination,
  requestsRealtime: state.requests.requestsRealtime
})

export default connect(
  getState,
  null,
)(Requests);
