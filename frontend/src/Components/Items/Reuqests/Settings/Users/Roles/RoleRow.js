import React, {useMemo} from "react";
import {connect} from "react-redux";
import {Checkbox, TableCell, TableRow} from '@mui/material';
import RoleRowMenu from "../../../../../Menus/Requests/Settings/Users/RoleRowMenu";
import {setSelectedRoles} from "../../../../../../Redux/Requests/Settings/requestsSettingsActions";

const RoleRow = (props) => {
  const {role, selectedRoles, setSelectedRoles} = props;
  const isSelected = useMemo(() => selectedRoles.indexOf(role.id) !== -1, [selectedRoles]);


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
  selectedRoles: state.requestsSettings.selectedRoles,
})

export default connect(
  getState,
  {
    setSelectedRoles
  },
)(RoleRow);
