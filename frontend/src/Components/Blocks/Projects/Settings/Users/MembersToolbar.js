import React from "react";
import Typography from "@mui/material/Typography";
import {connect} from "react-redux";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import clsx from "clsx";
import {ProjectSettingsStyles} from "../../../../../Styles/Screens";
import {setConfirmAction} from "../../../../../Redux/Users/usersActions";
import {useProjects} from "../../../../../Providers/ProjectsProvider";
import {setSelectedMembers} from "../../../../../Redux/Projects/projectActions";

const MembersToolbar = ({project, selectedMembers, setConfirmAction, setSelectedMembers}) => {
  const classes = ProjectSettingsStyles();
  const {deleteMembers} = useProjects();

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
    <div className={clsx('d-flex justify-content-center align-items-center', classes.headerContainer)}>
      <Typography variant="subtitle1" gutterBottom>Selected {selectedMembers.length}</Typography>
      <div className={'flex-grow-1'}/>
      <IconButton size={'small'} onClick={onDelete}>
        <Delete/>
      </IconButton>
    </div>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  selectedMembers: state.projects.selectedMembers
})

export default connect(
  getState,
  {
    setConfirmAction,
    setSelectedMembers
  },
)(MembersToolbar);
