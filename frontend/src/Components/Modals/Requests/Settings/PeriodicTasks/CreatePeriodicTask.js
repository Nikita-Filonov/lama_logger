import React, {useState} from "react";
import {useServices} from "../../../../../Providers/Requests/Tracks/ServicesProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {SlideTransition} from "../../../../../Utils/Utils/Common";
import {LoadingButton} from "@mui/lab";
import {connect} from "react-redux";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {AVAILABLE_TASKS, UNITS} from "../../../../../Utils/Constants";

const CreatePeriodicTask = ({project, modal, setModal}) => {
  const {request, createActivity} = useServices();
  const [task, setTask] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [every, setEvery] = useState(5);
  const [period, setPeriod] = useState('hours');
  const onClose = () => setModal(false)

  const onCreate = async () => createActivity(project.id).then(() => {
    onClose();
  });

  return (
    <Dialog
      open={modal}
      onClose={onClose}
      fullWidth
      maxWidth={'sm'}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>Create periodic task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create your own periodic task
        </DialogContentText>
        <TextField
          value={name}
          onChange={event => setName(event.target.value)}
          autoFocus
          label="Name"
          placeholder={'Clear requests every 5 hours'}
          fullWidth
          variant="standard"
          helperText={'Provide short description for your task'}
          className={'mt-3'}
        />
        <TextField
          multiline
          value={description}
          onChange={event => setDescription(event.target.value)}
          label="Description"
          placeholder={'Needed to clear outdated requests every 5 hours'}
          fullWidth
          variant="standard"
          helperText={'Provide detailed description about the details of this task'}
          className={'mt-3'}
        />
        <FormControl fullWidth variant="standard" size={'small'} className={'mt-3'}>
          <InputLabel>Select task</InputLabel>
          <Select value={task} onChange={event => setTask(event.target.value)}>
            {AVAILABLE_TASKS.map((task, index) =>
              <MenuItem key={index} value={task.task}>{task.label}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Typography className={'mt-3'}>Interval setup</Typography>
        <div className={'w-100 d-flex mt-1'}>
          <TextField
            value={every}
            onChange={event => setEvery(parseInt(event.target.value))}
            type={'number'}
            fullWidth
            variant={'standard'}
            label={'Amount'}
          />
          <FormControl variant="standard" sx={{marginLeft: 3, minWidth: 120}}>
            <InputLabel id="demo-simple-select-standard-label">Period</InputLabel>
            <Select value={period} onChange={event => setPeriod(event.target.value)}>
              {UNITS
                .filter(int => !['seconds', 'minutes'].includes(int.unit))
                .map(int =>
                  <MenuItem key={int.unit} value={int.unit}>{int.label}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={request}
          onClick={onCreate}
          disabled={name.length === 0 || task.length === 0 || !every}
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
)(CreatePeriodicTask);
