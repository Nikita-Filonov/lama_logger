import React, {useEffect, useRef} from "react";
import {useRequests} from "../../Providers/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import {createRequest} from "../../Redux/Requests/requestsActions";
import {wsUri} from "../../Utils/Constants";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import RequestsToolbar from "../../Components/Blocks/Requests/Toolbars/RequestsToolbar";
import {useParams} from "react-router-dom";
import RequestsTable from "../../Components/Blocks/Requests/RequestsTable/RequestsTable";
import RequestsToolbarSelected from "../../Components/Blocks/Requests/Toolbars/RequestsToolbarSelected";
import RequestsSideFilters from "../../Components/Blocks/Requests/RequestsFilters/RequestsSideFilters";
import TimeFilters from "../../Components/Modals/Requests/Filters/TimeFilters";
import {Container} from "@mui/material";
import {makeRequestsFilters} from "../../Utils/Utils";


const Requests = (props) => {
  const {createRequest, selectedRequests, requestsFilters, requestsPagination} = props;
  const {projectId} = useParams();
  const client = useRef(null);
  const {token} = useUsers()
  const {getRequests} = useRequests()

  useEffect(() => {
    (async () => {
      client.current = await new W3CWebSocket(wsUri + `projects/${projectId}/requests/`);
      client.current.onmessage = await onRequest

      return () => {
        client.current.close()
      }
    })()
  }, [projectId])

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

  const onRequest = async (message) => {
    const request = JSON.parse(message.data);
    createRequest(request)
  }

  return (
    <Container maxWidth={'xl'}>
      {selectedRequests.length > 0 ? <RequestsToolbarSelected/> : <RequestsToolbar/>}
      <div className={'d-flex mt-3'}>
        <RequestsSideFilters/>
        <RequestsTable/>
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
  requestsPagination: state.requests.requestsPagination
})

export default connect(
  getState,
  {
    createRequest
  },
)(Requests);
