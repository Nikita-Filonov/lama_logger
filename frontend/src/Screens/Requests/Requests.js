import React, {useEffect, useMemo, useRef} from "react";
import {useRequests} from "../../Providers/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import {CircularProgress, Container, Grid} from "@material-ui/core";
import List from "@mui/material/List";
import Request from "../../Components/Items/Reuqests/Request";
import ViewRequest from "../../Components/Blocks/Requests/ViewReuqest";
import {createRequest} from "../../Redux/Requests/requestsActions";
import {wsUri} from "../../Utils/Constants";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {successesByStatusCode} from "../../Utils/Utils";
import {EmptyList} from "../../Components/Other/EmptyList";
import {comp} from "../../Styles/Blocks";
import RequestsToolbar from "../../Components/Blocks/Requests/RequestsToolbar";
import {useHistory} from "react-router-dom";
import {useProjects} from "../../Providers/ProjectsProvider";

const Requests = (props) => {
  const {project, requests, request, requestsFilters, createRequest} = props;
  const history = useHistory()
  const client = useRef(null);
  const {token} = useUsers()
  const {getProject} = useProjects()
  const {load, getRequests, getRequest} = useRequests()

  const isRequestSelected = useMemo(() => Boolean(request?.request_url),
    [request?.id, request?.request_url])

  useEffect(() => {
    (async () => {
      if (project.id && token) {
        await getRequests(project.id)
        client.current = await new W3CWebSocket(wsUri + `projects/${project.id}/requests/`);
        client.current.onmessage = await onRequest
      }

      return () => {
        client.current.close()
      }
    })()
  }, [project.id, token])

  useEffect(() => {
    (async () => {
      if (!token) {
        return
      }

      const query = new URLSearchParams(history.location.search);
      if (query.get('requestId') && query.get('projectId')) {
        await getProject(query.get('projectId'))
        await getRequest(query.get('projectId'), query.get('requestId'))
      }
    })()
  }, [token])


  const onRequest = async (message) => {
    const request = JSON.parse(message.data);
    createRequest(request)
  }

  const filteredRequests = useMemo(
    () => requests.filter(r => requestsFilters.methods.includes(r.method) &&
      successesByStatusCode(r.response_code, requestsFilters.successes)),
    [requests, requestsFilters]
  )
  return (
    <Container>
      <RequestsToolbar/>
      <Grid container spacing={4} className={'mt-3'}>
        <Grid item xs={isRequestSelected ? 6 : 12} style={{maxHeight: '75vh', overflow: 'auto', paddingTop: 0}}>
          <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            {filteredRequests.length === 0 && !load && <EmptyList text={'No requests here'}/>}
            {load && <CircularProgress style={comp.spinner}/>}
            {filteredRequests.map(r => <Request item={r} key={r.request_id}/>)}
          </List>
        </Grid>
        {isRequestSelected &&
        <Grid item xs={6} style={{maxHeight: '75vh', overflow: 'auto', paddingTop: 0}}>
          <ViewRequest/>
        </Grid>}
      </Grid>
    </Container>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  request: state.requests.request,
  requests: state.requests.requests,
  requestsFilters: state.requests.requestsFilters,
})

export default connect(
  getState,
  {
    createRequest
  },
)(Requests);
