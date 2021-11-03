import React from "react";
import Typography from "@mui/material/Typography";
import {connect} from "react-redux";
import {IconButton, Paper} from "@mui/material";
import {Delete} from "@mui/icons-material";
import clsx from "clsx";
import {setConfirmAction} from "../../../../../../Redux/Users/usersActions";
import {setSelectedRoles} from "../../../../../../Redux/Requests/Settings/requestsSettingsActions";
import {ViewRequestStyles} from "../../../../../../Styles/Blocks";
import {usePermissions} from "../../../../../../Providers/Users/PermissionsProvider";
import {ROLE} from "../../../../../../Utils/Permissions/Projects";

const RolesToolbar = ({project, selectedRoles, setConfirmAction, setSelectedRoles}) => {
  const classes = ViewRequestStyles();
  const {isAllowed} = usePermissions();


  const onDelete = async () => setConfirmAction({
    modal: true,
    title: 'Delete roles?',
    description: 'Are you sure you want to delete this roles? ' +
      'You will not be able to undo this action',
    confirmButton: 'Delete',
    action: async () => {
      setSelectedRoles([])
    }
  })


  return (
    <Paper elevation={3} className={clsx('mt-4 d-flex align-items-center', classes.toolbarContainer)}>
      <Typography variant="subtitle1">Selected {selectedRoles.length}</Typography>
      <div className={'flex-grow-1'}/>
      <IconButton size={'small'} onClick={onDelete} disabled={!isAllowed([ROLE.delete])}>
        <Delete/>
      </IconButton>
    </Paper>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  selectedRoles: state.requestsSettings.selectedRoles
})

export default connect(
  getState,
  {
    setConfirmAction,
    setSelectedRoles
  },
)(RolesToolbar);
