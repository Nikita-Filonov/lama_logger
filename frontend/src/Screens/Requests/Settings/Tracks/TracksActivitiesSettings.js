import React, {useState} from "react";
import {ProjectSettingsStyles} from "../../../../Styles/Screens";
import {connect} from "react-redux";
import {ProjectSettingsHeader} from "../../../../Components/Blocks/Requests/Settings/ProjectSettingsHeader";
import {List, Typography} from "@mui/material";
import {Activity} from "../../../../Components/Items/Reuqests/Settings/Tracks/Activity";
import {DragDropContext} from "react-beautiful-dnd";
import {ZoomFab} from "../../../../Components/Blocks/Common/ZoomFab";
import CreateActivity from "../../../../Components/Modals/Requests/Settings/Tracks/CreateActivity";
import {moveActivity} from "../../../../Redux/Requests/Tracks/tracksActions";


const TracksActivitiesSettings = ({activities, project, moveActivity}) => {
  const classes = ProjectSettingsStyles();
  const [createActivityModal, setCreateActivityModal] = useState(false);

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const indexFrom = result.source.index;
    const indexTo = result.destination.index;
    // const activityIdFrom = parseInt(result.draggableId);
    // const activityIdTo = parseInt(result.destination.droppableId);
    moveActivity({indexFrom, indexTo})
  }

  return (
    <div className={classes.contentContainer}>
      <ProjectSettingsHeader title={'Activities'}/>
      <Typography variant={'body1'} className={'mt-3'}>
        Here you can setup your tracks flow. By default Lama Time suggest,
        to split your tracks into "Backend" and "Frontend", but you can setup your
        own flow with your services.
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <List>
          {activities
            .map((activity, index) =>
              <Activity key={activity.id} activity={activity} index={index}/>
            )
          }
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
})

export default connect(
  getState,
  {
    moveActivity
  },
)(TracksActivitiesSettings);
