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
import {setInviteMemberModal} from "../../../../../Redux/Projects/projectActions";
import FormControl from "@mui/material/FormControl";
import {useProjects} from "../../../../../Providers/ProjectsProvider";
import {ButtonSpinner} from "../../../../Blocks/Common/ButtonSpiner";
import RolesSelect from "../../../../Blocks/Projects/Settings/Users/Members/RolesSelect";


const InviteMember = ({project, inviteMemberModal, setInviteMemberModal}) => {
  const {request, inviteMember} = useProjects();
  const [member, setMember] = useState({username: '', roles: [], notify: false});
  const onClose = () => setInviteMemberModal(false)

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
    <Dialog open={inviteMemberModal} onClose={onClose} maxWidth={'sm'} fullWidth>
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
              onClick={() => setMember({...member, notify: !member.member})}
            />
          }
          label="Send notification"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onInvite}
          disabled={!member?.username || member?.roles?.length === 0 || request}
        >
          {request && <ButtonSpinner/>} Invite
        </Button>
      </DialogActions>
    </Dialog>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  inviteMemberModal: state.projects.inviteMemberModal,
})

export default connect(
  getState,
  {
    setInviteMemberModal
  },
)(InviteMember);
