import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {connect} from "react-redux";
import {SlideTransition} from "../../../../../Utils/Utils/Common";
import {LoadingButton} from "@mui/lab";
import {useServices} from "../../../../../Providers/Requests/Tracks/ServicesProvider";
import {usePermissions} from "../../../../../Providers/Users/PermissionsProvider";
import {ACTIVITY} from "../../../../../Utils/Permissions/Tracks";


const CreateActivity = ({project, modal, setModal}) => {
  const {isAllowed} = usePermissions();
  const {request, createActivity} = useServices();
  const [title, setTitle] = useState('');
  const onClose = () => setModal(false)

  const onCreate = async () => createActivity(project.id, {title}).then(() => {
    onClose();
    setTitle('');
  });

  return (
    <Dialog
      open={modal}
      onClose={onClose}
      fullWidth
      maxWidth={'sm'}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>Create activity</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create your own activity
        </DialogContentText>
        <TextField
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
          margin="dense"
          label="Title"
          placeholder={'Users frontend'}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={request}
          onClick={onCreate}
          disabled={!isAllowed([ACTIVITY.create])}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}


const getState = (state) => ({
  project: state.projects.project
})

export default connect(
  getState,
  null,
)(CreateActivity);
