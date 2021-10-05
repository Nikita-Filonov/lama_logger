import React from "react";
import {IconButton, Tooltip, Typography} from "@mui/material";
import {connect} from "react-redux";
import {ViewRequestStyles} from "../../../../Styles/Blocks";
import clsx from "clsx";
import {Delete} from "@material-ui/icons";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

const RequestsToolbarSelected = ({selectedRequests}) => {
  const classes = ViewRequestStyles()

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
        <IconButton>
          <Delete/>
        </IconButton>
      </Tooltip>
    </div>
  )
}

const getState = (state) => ({
  selectedRequests: state.requests.selectedRequests
})

export default connect(
  getState,
  null,
)(RequestsToolbarSelected);
