import React from "react";
import {IconButton, Tooltip, Typography} from "@mui/material";
import {connect} from "react-redux";
import {ViewRequestStyles} from "../../../../Styles/Blocks";
import clsx from "clsx";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import {useRequests} from "../../../../Providers/RequestsProvider";
import {setSelectAllRequests} from "../../../../Redux/Requests/requestsActions";
import {Delete} from "@mui/icons-material";

const RequestsToolbarSelected = ({project, selectedRequests, setSelectAllRequests}) => {
  const classes = ViewRequestStyles();
  const {deleteRequests} = useRequests();

  const onDelete = async () => {
    await deleteRequests(project.id, selectedRequests)
    setSelectAllRequests([])
  }

  return (
    <div className={clsx('mt-3 d-flex justify-content-center align-items-center', classes.toolbarContainer)}>
      <Typography>Selected {selectedRequests.length}</Typography>
      <div className={'flex-grow-1'}/>
      <Tooltip title={'Export selected requests'}>
        <IconButton className={'me-2'}>
          <SystemUpdateAltIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title={'Delete selected requests'} placement={'left'}>
        <IconButton onClick={onDelete}>
          <Delete/>
        </IconButton>
      </Tooltip>
    </div>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  selectedRequests: state.requests.selectedRequests
})

export default connect(
  getState,
  {
    setSelectAllRequests
  },
)(RequestsToolbarSelected);
