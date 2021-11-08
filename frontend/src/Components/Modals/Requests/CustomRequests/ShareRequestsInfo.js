import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert, AlertTitle} from "@mui/lab";
import {SlideTransition} from "../../../../Utils/Utils/Common";
import {Typography} from "@mui/material";


export const ShareRequestsInfo = ({modal, setModal, onAcceptShareInfo}) => {

  const onClose = () => setModal(false);

  return (
    <Dialog
      open={modal}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      fullWidth
    >
      <DialogTitle>Share requests information</DialogTitle>
      <DialogContent>
        <Alert severity="info" sx={{whiteSpace: 'pre-line'}}>
          <AlertTitle>Common concept of custom requests</AlertTitle>
          <Typography variant={'body1'}>
            By default custom requests made to be only for each user.
            This means only you can access your custom requests,
            change and delete them.{'\n'}{'\n'}

            Requests are split into projects. To avoid mess of
            requests from different services and projects.{'\n'}{'\n'}

            But you can share your custom requests with members of this project.
            They will have access to your history/requests and will be able to
            change and delete them.
          </Typography>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAcceptShareInfo}>Got it!</Button>
      </DialogActions>
    </Dialog>
  );
}



