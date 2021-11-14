import React from "react";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {SlideTransition} from "../../../../Utils/Utils/Common";


export const NodeChainReference = ({modal, setModal}) => {
  const onClose = () => setModal(false);

  const onGotIt = () => {
    localStorage.setItem('nodeChainRefModal', 'true');
    onClose();
  };

  return (
    <Dialog open={modal} onClose={onClose} TransitionComponent={SlideTransition}>
      <DialogTitle>Node chain reference</DialogTitle>
      <DialogContent>
        <Alert variant={'outlined'} severity={'info'}>
          When you change the request inside "Node chain" view,
          this requests also changes for whole project.
        </Alert>
        <DialogContentText sx={{mt: 2}}>
          Node chain represents interface for chaining multiple
          requests. This is useful when you have autotest or
          some context, where you want to see chain of requests.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onGotIt}>Got it!</Button>
      </DialogActions>
    </Dialog>
  )
}
