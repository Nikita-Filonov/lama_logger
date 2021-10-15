import React from "react";
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
import {ScopesList} from "../../../../../Blocks/Requests/Settings/Users/Roles/ScopesList";
import {setCreateRoleModal, setRole} from "../../../../../../Redux/Requests/Settings/requestsSettingsActions";
import {INITIAL_REQUESTS_SETTINGS} from "../../../../../../Redux/Requests/Settings/initialState";


const CreateRole = ({role, setRole, project, createRoleModal, setCreateRoleModal}) => {
  const {request, createRole, updateRole} = useProjects();
  const onClose = () => {
    setCreateRoleModal(false)
    setRole(INITIAL_REQUESTS_SETTINGS.role)
  }

  const onSelectScope = (isSelected, permission) => isSelected
    ? setRole({...role, scope: role.scope.filter(p => p !== permission)})
    : setRole({...role, scope: [...role.scope, permission]})

  const onCreate = async () => role?.editMode
    ? updateRole(project.id, role.id, role).then(() => onClose())
    : createRole(project.id, role).then(() => onClose());

  return (
    <Dialog open={createRoleModal} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>{role?.editMode ? 'Update' : 'Create'} role</DialogTitle>
      <DialogContent>
        {!role?.editMode && <DialogContentText>
          You can create your custom role with custom scope of permissions
        </DialogContentText>}
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
          {request && <ButtonSpinner/>} {role?.editMode ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}


const getState = (state) => ({
  role: state.requestsSettings.role,
  project: state.projects.project,
  createRoleModal: state.requestsSettings.createRoleModal,
})

export default connect(
  getState,
  {
    setRole,
    setCreateRoleModal
  },
)(CreateRole);
