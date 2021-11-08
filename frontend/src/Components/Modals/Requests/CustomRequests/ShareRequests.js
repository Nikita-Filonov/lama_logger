import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {connect} from "react-redux";
import {SlideTransition} from "../../../../Utils/Utils/Common";


const ShareRequests = ({modal, setModal}) => {

  const onClose = () => setModal(false);


  return (
    <Dialog
      open={modal}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      fullWidth
    >
      <DialogTitle>Share custom requests</DialogTitle>
      <DialogContent>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button>Add</Button>
      </DialogActions>
    </Dialog>
  );
}


export default connect(
  null,
  null,
)(ShareRequests);
