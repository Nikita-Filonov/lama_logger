import React, {useState} from "react";
import {Container, Fab, Grid} from "@mui/material";
import {DragDropContext} from "react-beautiful-dnd";
import {Add} from "@mui/icons-material";
import {common} from "../../Styles/Blocks";
import {DraggableServiceColumn} from "../../Components/Items/Reuqests/Tracks/DraggableServiceColumn";
import {connect} from "react-redux";
import CreateService from "../../Components/Modals/Requests/Tracks/CreateService";
import {moveService} from "../../Redux/Requests/Tracks/tracksActions";


const RequestsTracks = ({activities, moveService}) => {
  const [createServiceModal, setCreateServiceModal] = useState(false);


  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    let activitiesCopy = [...activities];
    const activityIdFrom = parseInt(result.source.droppableId);
    const activityIdTo = parseInt(result.destination.droppableId);
    const sourceActivity = activitiesCopy.find(a => a.id === activityIdFrom);
    const service = sourceActivity.services[result.source.index];
    const indexTo = result.destination.index;
    moveService({activityIdFrom, activityIdTo, indexTo, service})
  };

  return (
    <Container maxWidth={'xl'}>
      {/*<TracksToolbar/>*/}
      {/*<div className={'mt-3'}>*/}
      {/*  <TracksTable/>*/}
      {/*</div>*/}
      {/*<Fab variant="extended" color={'primary'} style={common.fab} onClick={() => setCreateTrackModal(true)}>*/}
      {/*  <Add sx={{mr: 1}}/>*/}
      {/*  NEW TRACK*/}
      {/*</Fab>*/}
      {/*<CreateTrack modal={createTrackModal} setModal={setCreateTrackModal}/>*/}
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2} className={'mt-3'}>
          {activities.map((activity) => (
            <DraggableServiceColumn activity={activity} key={activity.id}/>
          ))}
        </Grid>
      </DragDropContext>
      <Fab variant="extended" color={'primary'} style={common.fab} onClick={() => setCreateServiceModal(true)}>
        <Add sx={{mr: 1}}/>
        NEW SERVICE
      </Fab>
      <CreateService modal={createServiceModal} setModal={setCreateServiceModal}/>
    </Container>
  )
}


const getState = (state) => ({
  activities: state.tracks.activities,
})

export default connect(
  getState,
  {
    moveService
  },
)(RequestsTracks);
