import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {connect} from "react-redux";
import {setRequestsFilters, setRequestsTimeFilterModal} from "../../../../../Redux/Requests/Requests/requestsActions";
import {TextField} from "@mui/material";


const SaveFilters = ({modal, setModal}) => {
  const [title, setTitle] = useState('');

  const onClose = () => setModal(false);


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
        <Button disabled={title.length === 0}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}


const getState = (state) => ({
  requestsFilters: state.requests.requestsFilters,
  requestsTimeFilterModal: state.requests.requestsTimeFilterModal,
})

export default connect(
  getState,
  {
    setRequestsFilters,
    setRequestsTimeFilterModal,
  },
)(SaveFilters);
