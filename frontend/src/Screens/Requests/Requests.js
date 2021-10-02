import React, {useEffect, useMemo} from "react";
import {useRequests} from "../../Providers/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import {Button, Grid, TextField, Tooltip} from "@material-ui/core";
import List from "@mui/material/List";
import Request from "../../Components/Items/Reuqests/Request";
import {ArrowBack, Block} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {IconButton} from "@mui/material";
import ViewRequest from "../../Components/Blocks/Requests/ViewReuqest";
import {setRequest} from "../../Redux/Requests/requestsActions";

const Requests = ({project, requests, request, setRequest}) => {
  const history = useHistory()
  const {token} = useUsers()
  const {getRequests} = useRequests()

  const isRequestSelected = useMemo(() => Boolean(request?.request_url),
    [request?.id, request?.request_url])

  useEffect(() => {
    (async () => {
      (project.id && token) && await getRequests(project.id)
    })()
  }, [project.id, token])

  const onBack = () => {
    history.goBack()
    setRequest({})
  }

  return (
    <div className={'me-5 ms-5'}>
      <div className={'mt-3 d-flex justify-content-center align-items-center'}>
        <Button onClick={onBack} startIcon={<ArrowBack/>}>BACK</Button>
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
            {requests.map(r => <Request item={r} key={r.id}/>)}
          </List>
        </Grid>
        {isRequestSelected &&
        <Grid item xs={6} style={{maxHeight: '75vh', overflow: 'auto', paddingTop: 0}}>
          <ViewRequest/>
        </Grid>}
      </Grid>
    </div>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  request: state.requests.request,
  requests: state.requests.requests
})

export default connect(
  getState,
  {
    setRequest
  },
)(Requests);
