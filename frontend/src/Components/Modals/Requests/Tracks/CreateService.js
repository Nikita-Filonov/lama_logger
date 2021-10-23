import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {LoadingButton} from "@mui/lab";
import {connect} from "react-redux";
import {useServices} from "../../../../Providers/Requests/Tracks/ServicesProvider";


const CreateService = ({modal, setModal, project, activities}) => {
  const {request, createService} = useServices();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activity, setActivity] = useState(activities[0]);

  useEffect(() => setActivity(activities[0]), [activities])

  const onClose = () => setModal(false)

  const onCreate = async () => createService(project.id, activity.id, {title, description})
    .then(() => {
      onClose();
      setTitle('');
      setDescription('');
    });


  return (
    <Dialog open={modal} onClose={onClose}>
      <DialogTitle>Create service</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can create project and connect sdk to log your requests/responses
        </DialogContentText>
        <TextField
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
          margin="dense"
          label="Project title"
          placeholder={'Lama Logger'}
          fullWidth
          variant="standard"
          inputProps={{maxLength: 255}}
        />
        <TextField
          multiline
          value={description}
          onChange={event => setDescription(event.target.value)}
          autoFocus
          margin="dense"
          label="Description"
          placeholder={'Some description to your project'}
          fullWidth
          variant="standard"
          className={'mt-3'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={request}
          disabled={title.length === 0}
          onClick={onCreate}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  activities: state.tracks.activities,
})

export default connect(
  getState,
  null,
)(CreateService);
