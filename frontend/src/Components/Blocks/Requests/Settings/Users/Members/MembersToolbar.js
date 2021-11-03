import React from "react";
import Typography from "@mui/material/Typography";
import {connect} from "react-redux";
import {IconButton, Paper} from "@mui/material";
import {Delete} from "@mui/icons-material";
import clsx from "clsx";
import {setConfirmAction} from "../../../../../../Redux/Users/usersActions";
import {useProjects} from "../../../../../../Providers/ProjectsProvider";
import {setSelectedMembers} from "../../../../../../Redux/Requests/Settings/requestsSettingsActions";
import {ViewRequestStyles} from "../../../../../../Styles/Blocks";
import {usePermissions} from "../../../../../../Providers/Users/PermissionsProvider";
import {MEMBER} from "../../../../../../Utils/Permissions/Projects";

const MembersToolbar = ({project, selectedMembers, setConfirmAction, setSelectedMembers}) => {
  const classes = ViewRequestStyles();
  const {deleteMembers} = useProjects();
  const {isAllowed} = usePermissions();

  const onDelete = async () => setConfirmAction({
    modal: true,
    title: 'Delete members?',
    description: 'Are you sure you want to delete members? ' +
      'You will not be able to undo this action',
    confirmButton: 'Delete',
    action: async () => {
      await deleteMembers(project.id, {members: selectedMembers})
      setSelectedMembers([])
    }
  })


  return (
    <Paper elevation={3} className={clsx('mt-4 d-flex align-items-center', classes.toolbarContainer)}>
      <Typography variant="subtitle1">Selected {selectedMembers.length}</Typography>
      <div className={'flex-grow-1'}/>
      <IconButton size={'small'} onClick={onDelete} disabled={!isAllowed([MEMBER.delete])}>
        <Delete/>
      </IconButton>
    </Paper>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  selectedMembers: state.requestsSettings.selectedMembers
})

export default connect(
  getState,
  {
    setConfirmAction,
    setSelectedMembers
  },
)(MembersToolbar);
