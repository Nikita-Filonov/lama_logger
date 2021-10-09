import React from "react";
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, ListItemText, Select} from "@mui/material";
import {connect} from "react-redux";

const RolesSelect = ({project, member, onSelectRole, fullWidth = false, sx = {}}) => {
  const Role = ({projectRole}) => {
    const isSelected = member?.roles?.some(r => r.id === projectRole.id)
    return (
      <MenuItem
        value={projectRole}
        sx={{height: 40}}
        onClick={async () => await onSelectRole(projectRole, isSelected)}
      >
        <Checkbox
          size={'small'}
          checked={isSelected}
          onClick={async () => await onSelectRole(projectRole, isSelected)}
        />
        <ListItemText primary={projectRole.name}/>
      </MenuItem>
    )
  }

  return (
    <Select
      label={'sdfdsfsd'}
      sx={sx}
      fullWidth={fullWidth}
      size={'small'}
      variant={'standard'}
      multiple
      value={member?.roles}
      renderValue={(selected) => selected.map(role => role.name).join(', ')}
    >
      {project?.roles?.map(role => <Role key={role.id} projectRole={role}/>)}
    </Select>
  )
}

const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  null,
)(RolesSelect);
