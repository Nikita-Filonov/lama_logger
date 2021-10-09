import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  TextField
} from '@mui/material';
import {connect} from "react-redux";
import {useProjects} from "../../../../../../Providers/ProjectsProvider";
import {ButtonSpinner} from "../../../../../Blocks/Common/ButtonSpiner";
import {ScopesList} from "../../../../../Blocks/Projects/Settings/Users/Roles/ScopesList";


const CreateRole = ({project, modal, setModal}) => {
  const {request, createRole} = useProjects();
  const [role, setRole] = useState({name: '', scope: [], description: ''})
  const onClose = () => setModal(false)

  const onSelectScope = (isSelected, permission) => isSelected
    ? setRole({...role, scope: role.scope.filter(p => p !== permission)})
    : setRole({...role, scope: [...role.scope, permission]})

  const onCreate = async () => createRole(project.id, role).then(() => onClose());

  return (
    <Dialog open={modal} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>Create role</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can create your custom role with custom scope of permissions
        </DialogContentText>
        <TextField
          value={role.name}
          onChange={event => setRole({...role, name: event.target.value})}
          autoFocus
          margin="dense"
          label="Name"
          placeholder={'MyCustomRole'}
          fullWidth
          variant="standard"
          className={'mt-3'}
        />
        <TextField
          value={role.description}
          onChange={event => setRole({...role, description: event.target.value})}
          multiline
          autoFocus
          margin="dense"
          label="Description"
          placeholder={'Description'}
          fullWidth
          variant="standard"
          helperText={'Provide some description, so other users would know for what this role'}
          className={'mt-3'}
        />
        <FormControl className={'mt-3'} fullWidth>
          <FormLabel>Select scopes</FormLabel>
          <ScopesList scopes={role.scope} onSelectScope={onSelectScope}/>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={!role.name} onClick={onCreate}>
          {request && <ButtonSpinner/>} Create
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
