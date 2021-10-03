import React from "react";
import {Button, TextField, Tooltip} from "@material-ui/core";
import {ArrowBack, Block} from "@material-ui/icons";
import RequestsFilters from "./RequestsFilters";
import {IconButton} from "@mui/material";
import {connect} from "react-redux";
import {setRequest} from "../../../Redux/Requests/requestsActions";
import {useHistory} from "react-router-dom";
import {useRequests} from "../../../Providers/RequestsProvider";

const RequestsToolbar = ({project, requests, setRequest}) => {
  const history = useHistory();
  const {deleteRequests} = useRequests()

  const onBack = () => {
    history.goBack()
    setRequest({})
  }

  const onClear = async () => {
    const requestsToDelete = requests.map(r => r.id)
    await deleteRequests(project.id, requestsToDelete)
  }

  return (
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
        <IconButton onClick={onClear}><Block/></IconButton>
      </Tooltip>
    </div>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  requests: state.requests.requests,
})

export default connect(
  getState,
  {
    setRequest,
  },
)(RequestsToolbar);
