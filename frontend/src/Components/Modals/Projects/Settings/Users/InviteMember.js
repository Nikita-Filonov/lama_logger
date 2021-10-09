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
  Select,
  TextField
} from '@mui/material';
import {connect} from "react-redux";
import {setInviteMemberModal} from "../../../../../Redux/Projects/projectActions";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";


const InviteMember = ({project, inviteMemberModal, setInviteMemberModal}) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [notify, setNotify] = useState(false);
  const onClose = () => setInviteMemberModal(false)

  return (
    <Dialog open={inviteMemberModal} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>Invite member</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can invite other members to your project
        </DialogContentText>
        <TextField
          value={username}
          onChange={event => setUsername(event.target.value)}
          autoFocus
          margin="dense"
          label="Username or email"
          placeholder={'some_username or some@email.com'}
          fullWidth
          variant="standard"
        />
        <FormControl variant="standard" sx={{minWidth: 120}} fullWidth className={'mt-3'}>
          <InputLabel>Select role</InputLabel>
          <Select value={role} label="Age" onChange={event => setRole(event.target.value)}>
            {project?.roles?.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControlLabel
          className={'mt-3'}
          control={<Checkbox checked={notify} onClick={() => setNotify(!notify)}/>}
          label="Send notification"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={!username || !role}>Invite</Button>
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
