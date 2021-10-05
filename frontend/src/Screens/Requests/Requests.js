import React, {useEffect, useRef} from "react";
import {useRequests} from "../../Providers/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import {Container} from "@material-ui/core";
import {createRequest} from "../../Redux/Requests/requestsActions";
import {wsUri} from "../../Utils/Constants";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import RequestsToolbar from "../../Components/Blocks/Requests/RequestsToolbar";
import {useParams} from "react-router-dom";
import {useProjects} from "../../Providers/ProjectsProvider";
import RequestsTable from "../../Components/Blocks/Requests/RequestsTable/RequestsTable";


const Requests = (props) => {
  const {project, createRequest} = props;
  const {projectId} = useParams()
  const client = useRef(null);
  const {token} = useUsers()
  const {getProject} = useProjects()
  const {getRequests} = useRequests()

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
      if (!token && project.id) {
        return
      }

      await getProject(projectId)
    })()
  }, [token])


  const onRequest = async (message) => {
    const request = JSON.parse(message.data);
    createRequest(request)
  }

  return (
    <Container maxWidth={'xl'}>
      <RequestsToolbar/>
      <RequestsTable/>
      {/*<Grid container spacing={4} className={'mt-3'}>*/}
      {/*  <Grid item xs={isRequestSelected ? 6 : 12}>*/}
      {/*    <RequestsTable/>*/}
      {/*  </Grid>*/}
      {/*  {isRequestSelected &&*/}
      {/*  <Grid item xs={6} style={{maxHeight: '75vh', overflow: 'auto', paddingTop: 0}}>*/}
      {/*    <ViewRequest/>*/}
      {/*  </Grid>}*/}
      {/*</Grid>*/}
    </Container>
  )
}


const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  {
    createRequest
  },
)(Requests);
