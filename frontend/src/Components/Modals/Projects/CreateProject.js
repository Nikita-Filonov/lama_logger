import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {useProjects} from "../../../Providers/ProjectsProvider";


export const CreateProject = ({modal, setModal}) => {
  const {createProject} = useProjects();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [short, setShort] = useState('')

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
          placeholder={'Lama Logger'}
          fullWidth
          variant="standard"
          inputProps={{maxLength: 255}}
        />
        <TextField
          value={short}
          onChange={event => setShort(event.target.value)}
          autoFocus
          margin="dense"
          label="Short name"
          placeholder={'LL'}
          fullWidth
          inputProps={{maxLength: 10}}
          variant="standard"
          className={'mt-3'}
          helperText={'Short name for your project. For example if project name is Lama Logger, then short name ' +
          'will be LL'}
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
        <Button disabled={title.length === 0} onClick={onCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
