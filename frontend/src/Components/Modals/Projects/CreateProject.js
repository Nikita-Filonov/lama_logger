import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useProjects} from "../../../Providers/ProjectsProvider";
import {DialogContentText} from "@material-ui/core";

export const CreateProject = ({modal, setModal}) => {
  const {createProject} = useProjects()
  const [title, setTitle] = useState('')

  const onClose = () => setModal(false)

  const onCreate = async () => {
    await createProject({title});
    onClose()
    setTitle('')
  }

  return (
    <Dialog open={modal} onClose={onClose}>
      <DialogTitle>Create project</DialogTitle>
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
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={title.length === 0} onClick={onCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
