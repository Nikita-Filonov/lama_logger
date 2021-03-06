import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {connect} from "react-redux";
import {setConfirmAction} from "../../../Redux/Users/usersActions";
import {common} from "../../../Styles/Blocks";
import {SlideTransition} from "../../../Utils/Utils/Common";

const ConfirmAction = ({confirmAction, setConfirmAction}) => {
  const onClose = () => setConfirmAction({...confirmAction, modal: false})
  const onConfirm = async () => {
    await confirmAction.action()
    onClose()
  }


  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={'xs'}
        open={confirmAction?.modal}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        disableScrollLock={true}
        TransitionComponent={SlideTransition}
      >
        <DialogTitle id="form-dialog-title">{confirmAction?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText className={common.breakText}>{confirmAction?.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          {confirmAction?.confirmButton && <Button onClick={onConfirm} color="primary">
            {confirmAction.confirmButton}
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}

const getState = (state) => ({
  confirmAction: state.users.confirmAction
})

export default connect(
  getState,
  {
    setConfirmAction
  },
)(ConfirmAction);
