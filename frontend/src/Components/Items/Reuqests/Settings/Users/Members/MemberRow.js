import React, {useMemo} from "react";
import {connect} from "react-redux";
import {Button, Checkbox, TableCell, TableRow} from '@mui/material';
import {useProjects} from "../../../../../../Providers/ProjectsProvider";
import {setConfirmAction} from "../../../../../../Redux/Users/usersActions";
import RolesSelect from "../../../../../Blocks/Requests/Settings/Users/Members/RolesSelect";
import {setSelectedMembers} from "../../../../../../Redux/Requests/Settings/requestsSettingsActions";


const MemberRow = (props) => {
  const {member, project, selectedMembers, setSelectedMembers, setConfirmAction} = props;
  const {updateMember, deleteMembers} = useProjects();
  const isSelected = useMemo(() => selectedMembers.indexOf(member.id) !== -1, [selectedMembers]);

  const onDelete = async () => {
    setConfirmAction({
      modal: true,
      title: 'Delete member?',
      description: 'Are you sure you want to delete member? ' +
        'You will not be able to undo this action',
      confirmButton: 'Delete',
      action: async () => await deleteMembers(project.id, {members: [member.id]})
    })
  }

  const onSelectRole = async (role, isSelected) => {
    const roles = isSelected
      ? member.roles.filter(r => r.id !== role.id)
      : [...member.roles, role]
    await updateMember(project.id, member.id, {roles: roles.map(r => r.id)})
  }

  return (
    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} selected={isSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          size={'small'}
          color={'primary'}
          checked={isSelected}
          onClick={() => setSelectedMembers({isSelected, memberId: member.id})}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        {member?.user?.username}
      </TableCell>
      <TableCell align="left">
        <RolesSelect member={member} onSelectRole={onSelectRole} sx={{width: 300, display: 'flex'}}/>
      </TableCell>
      <TableCell padding="checkbox">
        <Button style={{color: 'red'}} onClick={onDelete}>Delete</Button>
      </TableCell>
    </TableRow>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  selectedMembers: state.requestsSettings.selectedMembers,
})

export default connect(
  getState,
  {
    setSelectedMembers,
    setConfirmAction
  },
)(MemberRow);
