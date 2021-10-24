import React, {useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {List, Typography} from "@mui/material";
import {Activity} from "../../../../Components/Items/Reuqests/Settings/Tracks/Activity";
import {DragDropContext} from "react-beautiful-dnd";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import CreateActivity from "../../../../Components/Modals/Requests/Settings/Tracks/CreateActivity";


const TracksActivitiesSettings = ({activities, project, projectSettings}) => {
  const classes = ProjectSettingsStyles();
  const [createActivityModal, setCreateActivityModal] = useState(false);

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Activities'}/>
      <Typography variant={'body1'} className={'mt-3'}>
        Here you can setup your tracks flow. By default Lama Time suggest,
        to split your tracks into "Backend" and "Frontend", but you can setup your
        own flow with your services.
      </Typography>
      <DragDropContext>
        <List>
          {activities.map((activity, index) => <Activity key={activity.id} activity={activity} index={index}/>)}
        </List>
      </DragDropContext>
      <ZoomFab title={'New activity'} action={() => setCreateActivityModal(true)}/>
      <CreateActivity modal={createActivityModal} setModal={setCreateActivityModal}/>
    </div>
  )
}


const getState = (state) => ({
  activities: state.tracks.activities,
  project: state.projects.project,
  projectSettings: state.projects.projectSettings
})

export default connect(
  getState,
  null,
)(TracksActivitiesSettings);
