import React, {useEffect, useState} from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
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
          Services used to keep structure of tracks. And also they helps to understand
          which service are broken/ok.

          You can create services like in your project architecture. For example: "Users frontend",
          "Dashboard fronted", "Users backend", "Dashboard backend" etc.

        </DialogContentText>
        <TextField
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
          margin="dense"
          label="Service title"
          placeholder={'Users backend'}
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
          placeholder={'Users API and identity'}
          fullWidth
          variant="standard"
          className={'mt-3'}
        />
        <Autocomplete
          className={'mt-3'}
          fullWidth
          autoHighlight
          disableClearable
          options={activities}
          defaultValue={activity}
          getOptionLabel={(option, _) => option?.title}
          onChange={(event, value) => setActivity(value)}
          renderInput={(params) =>
            <TextField
              {...params}
              fullWidth
              label={'Select an activity'}
              variant={'standard'}
            />
          }
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
