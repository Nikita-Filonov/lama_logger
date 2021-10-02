import React, {useEffect} from "react";
import {useRequests} from "../../Providers/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import {Button, Container, TextField, Tooltip} from "@material-ui/core";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Request from "../../Components/Items/Reuqests/Request";
import {ArrowBack, Block} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import {IconButton} from "@mui/material";

const Requests = ({project, requests}) => {
  const history = useHistory()
  const {token} = useUsers()
  const {getRequests} = useRequests()

  useEffect(() => {
    (async () => {
      (project.id && token) && await getRequests(project.id)
    })()
  }, [project.id, token])

  return (
    <Container>
      <div className={'mt-3 d-flex justify-content-center align-items-center'}>
        <Button onClick={() => history.goBack()} startIcon={<ArrowBack/>}>BACK</Button>
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
      <List
        sx={{width: '100%', bgcolor: 'background.paper'}}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Requests
          </ListSubheader>
        }
      >
        {requests.map(r => <Request request={r} key={r.id}/>)}
      </List>
    </Container>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  requests: state.requests.requests
})

export default connect(
  getState,
  null,
)(Requests);
