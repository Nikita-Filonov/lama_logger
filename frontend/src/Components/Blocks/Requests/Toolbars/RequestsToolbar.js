import React from "react";
import {Button, TextField, Tooltip} from "@material-ui/core";
import {ArrowBack, Block} from "@material-ui/icons";
import RequestsFilters from "../RequestsFilters";
import {IconButton} from "@mui/material";
import {connect} from "react-redux";
import {setRequest} from "../../../../Redux/Requests/requestsActions";
import {useHistory} from "react-router-dom";
import {useRequests} from "../../../../Providers/RequestsProvider";
import {ViewRequestStyles} from "../../../../Styles/Blocks";
import clsx from "clsx";
import RequestsMenu from "../../../Menus/Requests/RequestsMenu";

const RequestsToolbar = ({project, requests, setRequest}) => {
  const classes = ViewRequestStyles()
  const history = useHistory();
  const {deleteRequests} = useRequests()

  const onBack = () => {
    history.push('/projects')
    setRequest({})
  }

  const onClear = async () => {
    const requestsToDelete = requests.map(r => r.id)
    await deleteRequests(project.id, requestsToDelete)
  }

  return (
    <div className={clsx('mt-3 d-flex justify-content-center align-items-center', classes.toolbarContainer)}>
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
      <RequestsMenu/>
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
