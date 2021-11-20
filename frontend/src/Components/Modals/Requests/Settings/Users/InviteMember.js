import React, {useState} from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  InputLabel,
  TextField
} from '@mui/material';
import {connect} from "react-redux";
import FormControl from "@mui/material/FormControl";
import {useProjects} from "../../../../../Providers/ProjectsProvider";
import RolesSelect from "../../../../Blocks/Requests/Settings/Users/Members/RolesSelect";
import {setInviteMemberModal} from "../../../../../Redux/Requests/Settings/requestsSettingsActions";
import {LoadingButton} from "@mui/lab";
import {usePermissions} from "../../../../../Providers/Users/PermissionsProvider";
import {MEMBER} from "../../../../../Utils/Permissions/Projects";
import {SlideTransition} from "../../../../../Utils/Utils/Common";


const InviteMember = ({project, inviteMemberModal, setInviteMemberModal}) => {
  const {isAllowed} = usePermissions();
  const {request, inviteMember} = useProjects();
  const [member, setMember] = useState({username: '', roles: [], notify: false});
  const onClose = () => {
    setInviteMemberModal(false);
    setMember({username: '', roles: [], notify: false});
  };

  const onInvite = async () => {
    const payload = {...member, roles: member.roles.map(r => r.id)}
    inviteMember(project.id, payload).then(() => onClose())
  }
  const onSelectRole = async (role, isSelected) => {
    const roles = isSelected
      ? member.roles.filter(r => r.id !== role.id)
      : [...member.roles, role]
    setMember({...member, roles})
  }

  return (
    <Dialog
      open={inviteMemberModal}
      onClose={onClose}
      maxWidth={'sm'}
      fullWidth
      TransitionComponent={SlideTransition}
    >
      <DialogTitle>Invite member</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can invite other members to your project
        </DialogContentText>
        <TextField
          value={member.username}
          onChange={event => setMember({...member, username: event.target.value})}
          autoFocus
          margin="dense"
          label="Username or email"
          placeholder={'some_username or some@email.com'}
          fullWidth
          variant="standard"
        />
        <FormControl variant="standard" sx={{minWidth: 120}} fullWidth className={'mt-3'}>
          <InputLabel>Select role</InputLabel>
          <RolesSelect member={member} onSelectRole={onSelectRole} fullWidth={true}/>
        </FormControl>
        <FormControlLabel
          className={'mt-3'}
          control={
            <Checkbox
              checked={member.notify}
              onClick={() => setMember({...member, notify: !member.notify})}
            />
          }
          label="Send notification"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          loading={request}
          onClick={onInvite}
          disabled={!member?.username || member?.roles?.length === 0 || !isAllowed([MEMBER.create])}
        >
          Invite
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  inviteMemberModal: state.requestsSettings.inviteMemberModal,
})

export default connect(
  getState,
  {
    setInviteMemberModal
  },
)(InviteMember);
