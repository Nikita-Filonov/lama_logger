import React from "react";
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
import {useProjectTasks} from "../../../../../Providers/Requests/ProjectTasksProvider";
import {setCreateTaskModal, setPeriodicTask} from "../../../../../Redux/Requests/Settings/requestsSettingsActions";
import {INITIAL_REQUESTS_SETTINGS} from "../../../../../Redux/Requests/Settings/initialState";
import {usePermissions} from "../../../../../Providers/Users/PermissionsProvider";
import {PROJECT_TASK} from "../../../../../Utils/Permissions/Projects";

const CreatePeriodicTask = (props) => {
  const {project, periodicTask, setPeriodicTask, createTaskModal, setCreateTaskModal} = props;
  const {isAllowed} = usePermissions();
  const {request, createTask, updateTask} = useProjectTasks();

  const onClose = () => {
    setCreateTaskModal(false);
    setPeriodicTask(INITIAL_REQUESTS_SETTINGS.periodicTask);
  }

  const onCreate = async () => (periodicTask.editMode
      ? updateTask(project.id, periodicTask.taskId, {task: periodicTask})
      : createTask(project.id, {task: periodicTask})
  ).then(() => onClose());

  return (
    <Dialog
      open={createTaskModal}
      onClose={onClose}
      fullWidth
      maxWidth={'sm'}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>{periodicTask.editMode ? 'Update' : 'Create'} periodic task</DialogTitle>
      <DialogContent>
        {!periodicTask.editMode && <DialogContentText>Create your own periodic task</DialogContentText>}
        <TextField
          value={periodicTask.name}
          onChange={event => setPeriodicTask({...periodicTask, name: event.target.value})}
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
          value={periodicTask.description}
          onChange={event => setPeriodicTask({...periodicTask, description: event.target.value})}
          label="Description"
          placeholder={'Needed to clear outdated requests every 5 hours'}
          fullWidth
          variant="standard"
          helperText={'Provide detailed description about the details of this task'}
          className={'mt-3'}
        />
        <FormControl fullWidth variant="standard" size={'small'} className={'mt-3'}>
          <InputLabel>Select task</InputLabel>
          <Select
            value={periodicTask.task}
            onChange={event => setPeriodicTask({...periodicTask, task: event.target.value})}
          >
            {AVAILABLE_TASKS.map((task, index) =>
              <MenuItem key={index} value={task.task}>{task.label}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Typography className={'mt-3'}>Interval setup</Typography>
        <div className={'w-100 d-flex mt-1'}>
          <TextField
            value={periodicTask.interval.every}
            onChange={event => setPeriodicTask({
              ...periodicTask,
              interval: {...periodicTask.interval, every: parseInt(event.target.value)}
            })}
            type={'number'}
            fullWidth
            variant={'standard'}
            label={'Amount'}
          />
          <FormControl variant="standard" sx={{marginLeft: 3, minWidth: 120}}>
            <InputLabel id="demo-simple-select-standard-label">Period</InputLabel>
            <Select
              value={periodicTask.interval.period}
              onChange={event => setPeriodicTask({
                ...periodicTask,
                interval: {...periodicTask.interval, period: event.target.value}
              })}
            >
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
          disabled={
            periodicTask.name.length === 0 ||
            periodicTask.task.length === 0 ||
            !periodicTask.interval.every ||
            !isAllowed([PROJECT_TASK.create, PROJECT_TASK.update])
          }
        >
          {periodicTask.editMode ? 'Update' : 'Create'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  periodicTask: state.requestsSettings.periodicTask,
  createTaskModal: state.requestsSettings.createTaskModal
})

export default connect(
  getState,
  {
    setPeriodicTask,
    setCreateTaskModal
  },
)(CreatePeriodicTask);
