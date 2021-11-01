import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {connect} from "react-redux";
import {TextField} from "@mui/material";
import {useRequests} from "../../../../../Providers/Requests/RequestsProvider";
import {LoadingButton} from "@mui/lab";


const SaveFilters = ({modal, setModal, project, requestsFilters}) => {
  const {request, createRequestsFilter} = useRequests();
  const [title, setTitle] = useState('');

  const onClose = () => setModal(false);

  const onSave = async () => createRequestsFilter(project.id, {...requestsFilters, title})
    .then(() => onClose());

  return (
    <Dialog open={modal} onClose={onClose} fullWidth>
      <DialogTitle>Save filters</DialogTitle>
      <DialogContent>
        <TextField
          value={title}
          onChange={event => setTitle(event.target.value)}
          fullWidth
          variant={'standard'}
          label={'Title'}
          placeholder={'Production filters'}
          helperText={'Name your set of filters, this will help you and others to find them later'}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={request}
          disabled={title.length === 0}
          onClick={onSave}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}


const getState = (state) => ({
  project: state.projects.project,
  requestsFilters: state.requests.requestsFilters,
})

export default connect(
  getState,
  null,
)(SaveFilters);
