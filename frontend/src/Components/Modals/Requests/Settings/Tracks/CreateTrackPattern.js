import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {connect} from "react-redux";
import {SlideTransition} from "../../../../../Utils/Utils/Common";
import {LoadingButton} from "@mui/lab";
import {useProjectSettings} from "../../../../../Providers/Requests/ProjectSettingsProvider";


const CreateTrackPattern = ({project, modal, setModal, trackPatterns}) => {
  const {request, updateProjectSettings} = useProjectSettings();
  const [pattern, setPattern] = useState('');
  const [regex, setRegex] = useState('');
  const onClose = () => setModal(false)

  const onCreate = async () => updateProjectSettings(project.id, {
    trackPatterns: [...trackPatterns, {pattern, regex}]
  }).then(() => {
    onClose();
    setPattern('');
    setRegex('');
  });

  return (
    <Dialog
      open={modal}
      onClose={onClose}
      fullWidth
      maxWidth={'sm'}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>Create pattern</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create your own pattern. Then you will be able to use it on track endpoints
        </DialogContentText>
        <TextField
          value={pattern}
          onChange={event => setPattern(event.target.value)}
          autoFocus
          margin="dense"
          label="Pattern"
          placeholder={'{my_pattern}'}
          fullWidth
          variant="standard"
        />
        <TextField
          value={regex}
          onChange={event => setRegex(event.target.value)}
          autoFocus
          margin="dense"
          label="Regex expression"
          placeholder={'^\\d$'}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={request}
          onClick={onCreate}
          disabled={pattern.length === 0 || regex.length === 0}
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
)(CreateTrackPattern);
