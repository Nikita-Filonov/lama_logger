import React, {useMemo} from "react";
import {connect} from "react-redux";
import {Button, Checkbox, Select, TableCell, TableRow} from '@mui/material';
import {setSelectedMembers} from "../../../../../Redux/Projects/projectActions";
import MenuItem from "@mui/material/MenuItem";
import {useProjects} from "../../../../../Providers/ProjectsProvider";
import {setConfirmAction} from "../../../../../Redux/Users/usersActions";

const MemberRow = (props) => {
  const {member, project, selectedMembers, setSelectedMembers, setConfirmAction} = props;
  const {updateMember, deleteMembers} = useProjects();
  const isSelected = useMemo(() => selectedMembers.indexOf(member.id) !== -1, [selectedMembers]);

  const onSelectRole = async (role) => {
    await updateMember(project.id, member.id, {role})
  }

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
        <Select
          variant={'standard'}
          size={'small'}
          value={member?.role?.id}
          disableUnderline={true}
          onChange={async event => await onSelectRole(event.target.value)}
        >
          {project?.roles?.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
        </Select>
      </TableCell>
      <TableCell padding="checkbox">
        <Button style={{color: 'red'}} onClick={onDelete}>Delete</Button>
      </TableCell>
    </TableRow>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  selectedMembers: state.projects.selectedMembers,
})

export default connect(
  getState,
  {
    setSelectedMembers,
    setConfirmAction
  },
)(MemberRow);
