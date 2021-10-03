import React, {useEffect, useMemo, useRef} from "react";
import {useRequests} from "../../Providers/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import {Button, CircularProgress, Container, Grid, TextField, Tooltip} from "@material-ui/core";
import List from "@mui/material/List";
import Request from "../../Components/Items/Reuqests/Request";
import {ArrowBack, Block} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {IconButton} from "@mui/material";
import ViewRequest from "../../Components/Blocks/Requests/ViewReuqest";
import {createRequest, setRequest} from "../../Redux/Requests/requestsActions";
import {wsUri} from "../../Utils/Constants";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import RequestsFilters from "../../Components/Blocks/Requests/RequestsFilters";
import {successesByStatusCode} from "../../Utils/Utils";
import {EmptyList} from "../../Components/Other/EmptyList";
import {comp} from "../../Styles/Blocks";

const Requests = (props) => {
  const {project, requests, request, requestsFilters, setRequest, createRequest} = props;
  const client = useRef(null);
  const history = useHistory()
  const {token} = useUsers()
  const {load, getRequests} = useRequests()

  const isRequestSelected = useMemo(() => Boolean(request?.request_url),
    [request?.id, request?.request_url])

  useEffect(() => {
    (async () => {
      if (project.id && token) {
        await getRequests(project.id)
        client.current = await new W3CWebSocket(wsUri + `projects/${project.id}/requests/`);
        client.current.onmessage = await onRequest
      }
    })()
  }, [project.id, token])

  const onBack = () => {
    history.goBack()
    setRequest({})
  }

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
      <div className={'mt-3 d-flex justify-content-center align-items-center'}>
        <Button onClick={onBack} startIcon={<ArrowBack/>}>BACK</Button>
        <RequestsFilters/>
        <div className={'flex-grow-1'}/>
        <TextField
          label="Search"
          variant="standard"
          size={'small'}
          className={'w-25 me-4'}
          placeholder={'Search'}
          style={{height: 45}}
        />
        <Tooltip title={'Clear requests'}>
          <IconButton><Block/></IconButton>
        </Tooltip>
      </div>
      <Grid container spacing={4} className={'mt-3'}>
        <Grid item xs={isRequestSelected ? 6 : 12} style={{maxHeight: '75vh', overflow: 'auto', paddingTop: 0}}>
          <List sx={{width: '100%', bgcolor: 'background.paper'}}>
            {filteredRequests.length === 0 && !load && <EmptyList text={'No requests here'}/>}
            {load && <CircularProgress style={comp.spinner}/>}
            {filteredRequests.map(r => <Request item={r} key={r.id}/>)}
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
    setRequest,
    createRequest
  },
)(Requests);
