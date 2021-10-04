import React, {useEffect, useMemo, useRef} from "react";
import {useRequests} from "../../Providers/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import {Container, Grid} from "@material-ui/core";
import ViewRequest from "../../Components/Blocks/Requests/ViewReuqest";
import {createRequest} from "../../Redux/Requests/requestsActions";
import {wsUri} from "../../Utils/Constants";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import RequestsToolbar from "../../Components/Blocks/Requests/RequestsToolbar";
import {useHistory} from "react-router-dom";
import {useProjects} from "../../Providers/ProjectsProvider";
import RequestsTable from "../../Components/Blocks/Requests/RequestsTable";


const Requests = (props) => {
  const {project, request, createRequest} = props;
  const history = useHistory()
  const client = useRef(null);
  const {token} = useUsers()
  const {getProject} = useProjects()
  const {getRequests, getRequest} = useRequests()

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

  return (
    <Container maxWidth={'xl'}>
      <RequestsToolbar/>
      <Grid container spacing={4} className={'mt-3'}>
        <Grid item xs={isRequestSelected ? 6 : 12}>
          <RequestsTable/>
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
})

export default connect(
  getState,
  {
    createRequest
  },
)(Requests);
