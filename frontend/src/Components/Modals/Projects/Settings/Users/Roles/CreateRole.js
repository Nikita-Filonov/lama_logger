import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {connect} from "react-redux";
import {useProjects} from "../../../../../../Providers/ProjectsProvider";
import {ButtonSpinner} from "../../../../../Blocks/Common/ButtonSpiner";


const CreateRole = ({project, modal, setModal}) => {
  const {request, inviteMember} = useProjects();
  const onClose = () => setModal(false)


  return (
    <Dialog open={modal} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>Invite member</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can invite other members to your project
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Username or email"
          placeholder={'some_username or some@email.com'}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
        >
          {request && <ButtonSpinner/>} Invite
        </Button>
      </DialogActions>
    </Dialog>
  )
}


const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  null,
)(CreateRole);
