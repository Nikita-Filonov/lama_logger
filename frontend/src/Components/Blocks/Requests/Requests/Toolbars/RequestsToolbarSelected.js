import React from "react";
import {IconButton, Tooltip, Typography} from "@mui/material";
import {connect} from "react-redux";
import {ViewRequestStyles} from "../../../../../Styles/Blocks";
import clsx from "clsx";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import {useRequests} from "../../../../../Providers/Requests/RequestsProvider";
import {setRequestsPagination, setSelectedRequests} from "../../../../../Redux/Requests/Requests/requestsActions";
import {Close, Delete} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import {setConfirmAction} from "../../../../../Redux/Users/usersActions";
import {usePermissions} from "../../../../../Providers/Users/PermissionsProvider";
import {REQUEST} from "../../../../../Utils/Permissions/Requests";

const RequestsToolbarSelected = (props) => {
  const {
    project,
    selectedRequests,
    setSelectedRequests,
    requestsPagination,
    setRequestsPagination,
    setConfirmAction
  } = props;
  const classes = ViewRequestStyles();
  const {isAllowed} = usePermissions();
  const {deleteRequests} = useRequests();

  const onDelete = async () => {
    setConfirmAction({
      modal: true,
      title: 'Delete requests?',
      description: 'Are your sure you want to delete selected requests? You will unable to restore them later',
      confirmButton: 'Delete',
      action: async () => {
        await deleteRequests(project.id, selectedRequests)
        setSelectedRequests([])
        setRequestsPagination({...requestsPagination, page: 0})
      }
    })
  };

  const onClearSelectedRequests = () => setSelectedRequests([]);

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex justify-content-center align-items-center', classes.toolbarContainer)}
    >
      <Tooltip title={'Clear selected requests'}>
        <IconButton sx={{mr: 1}} onClick={onClearSelectedRequests}>
          <Close/>
        </IconButton>
      </Tooltip>
      <Typography sx={{ml: 1}}>Selected {selectedRequests.length}</Typography>
      <div className={'flex-grow-1'}/>
      <Tooltip title={'Export selected requests'}>
        <IconButton className={'me-2'}>
          <SystemUpdateAltIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title={'Delete selected requests'} placement={'left'}>
        <IconButton onClick={onDelete} disabled={!isAllowed([REQUEST.delete])}>
          <Delete/>
        </IconButton>
      </Tooltip>
    </Paper>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  selectedRequests: state.requests.selectedRequests,
  requestsPagination: state.requests.requestsPagination
})

export default connect(
  getState,
  {
    setSelectedRequests,
    setRequestsPagination,
    setConfirmAction,
  },
)(RequestsToolbarSelected);
