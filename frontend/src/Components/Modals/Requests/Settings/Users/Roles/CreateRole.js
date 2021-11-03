import React, {useCallback} from "react";
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
import {ScopesList} from "../../../../../Blocks/Requests/Settings/Users/Roles/ScopesList";
import {setCreateRoleModal, setRole} from "../../../../../../Redux/Requests/Settings/requestsSettingsActions";
import {INITIAL_REQUESTS_SETTINGS} from "../../../../../../Redux/Requests/Settings/initialState";
import {Alert, LoadingButton} from "@mui/lab";
import {usePermissions} from "../../../../../../Providers/Users/PermissionsProvider";
import {ROLE} from "../../../../../../Utils/Permissions/Projects";


const CreateRole = ({role, setRole, project, createRoleModal, setCreateRoleModal}) => {
  const {isAllowed} = usePermissions();
  const {request, createRole, updateRole} = useProjects();
  const onClose = () => {
    setCreateRoleModal(false)
    setRole(INITIAL_REQUESTS_SETTINGS.role)
  }

  const onSelectScope = useCallback(async (isSelected, permission) => isSelected
    ? setRole({...role, scope: role.scope.filter(p => p !== permission)})
    : setRole({...role, scope: [...role.scope, permission]}),
    [role]
  )

  const onCreate = useCallback(async () => role?.editMode
    ? updateRole(project.id, role.id, role).then(() => onClose())
    : createRole(project.id, role).then(() => onClose()),
    [role]
  );

  return (
    <Dialog open={createRoleModal} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>{role?.editMode ? 'Update' : 'Create'} role</DialogTitle>
      <DialogContent>
        {!role?.editMode && <DialogContentText>
          You can create your custom role with custom scope of permissions
        </DialogContentText>}
        <Alert severity="warning" sx={{mt: 2}}>
          Keep in mind that all roles has "View" permission by default.
          And you can not remove this permission for now.
        </Alert>
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
        <LoadingButton
          loading={request}
          disabled={role?.name?.length === 0 || !isAllowed([ROLE.create, ROLE.update])}
          onClick={onCreate}
        >
          {role?.editMode ? 'Update' : 'Create'}
        </LoadingButton>
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
