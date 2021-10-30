import React, {useState} from "react";
import {connect} from "react-redux";
import {Typography} from "@mui/material";
import {ProjectSettingsStyles} from "../../../Styles/Screens";
import {ProjectSettingsHeader} from "../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {ZoomFab} from "../../../Components/Blocks/Common/ZoomFab";
import CreatePeriodicTask from "../../../Components/Modals/Requests/Settings/PeriodicTasks/CreatePeriodicTask";


const PeriodicTasksSettings = ({activities, project, moveActivity}) => {
  const classes = ProjectSettingsStyles();
  const [createPeriodicTaskModal, setCreatePeriodicTaskModal] = useState(false);


  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Setup periodic tasks'}/>
      <Typography variant={'body1'} className={'mt-3'}>
        Here you can setup periodic task
      </Typography>

      <ZoomFab title={'New task'} action={() => setCreatePeriodicTaskModal(true)}/>
      <CreatePeriodicTask modal={createPeriodicTaskModal} setModal={setCreatePeriodicTaskModal}/>
    </div>
  )
}


const getState = (state) => ({
  activities: state.tracks.activities,
  project: state.projects.project,
})

export default connect(
  getState,
  null,
)(PeriodicTasksSettings);
