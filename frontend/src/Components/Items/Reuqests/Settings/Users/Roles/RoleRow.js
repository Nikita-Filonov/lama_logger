import React, {useMemo} from "react";
import {connect} from "react-redux";
import {Checkbox, TableCell, TableRow} from '@mui/material';
import {setSelectedRoles} from "../../../../../../Redux/Projects/projectActions";
import {useProjects} from "../../../../../../Providers/ProjectsProvider";
import {setConfirmAction} from "../../../../../../Redux/Users/usersActions";
import RoleRowMenu from "../../../../../Menus/Requests/Settings/Users/RoleRowMenu";

const RoleRow = (props) => {
  const {role, project, selectedRoles, setSelectedRoles, setConfirmAction} = props;
  const {deleteMembers} = useProjects();
  const isSelected = useMemo(() => selectedRoles.indexOf(role.id) !== -1, [selectedRoles]);

  const onDelete = async () => {
    setConfirmAction({
      modal: true,
      title: 'Delete member?',
      description: 'Are you sure you want to delete member? ' +
        'You will not be able to undo this action',
      confirmButton: 'Delete',
      action: async () => await deleteMembers(project.id, {members: [role.id]})
    })
  }


  return (
    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} selected={isSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          size={'small'}
          color={'primary'}
          checked={isSelected}
          onClick={() => setSelectedRoles({isSelected, roleId: role.id})}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        {role?.name}
      </TableCell>
      <TableCell scope="row" component="th">
        {role?.scope.length} scopes
      </TableCell>
      <TableCell padding="checkbox">
        <RoleRowMenu role={role}/>
      </TableCell>
    </TableRow>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  selectedRoles: state.projects.selectedRoles,
})

export default connect(
  getState,
  {
    setSelectedRoles,
    setConfirmAction
  },
)(RoleRow);
