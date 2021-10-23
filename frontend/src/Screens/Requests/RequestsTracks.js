import React, {useEffect, useState} from "react";
import {Container, Fab, Grid} from "@mui/material";
import {DragDropContext} from "react-beautiful-dnd";
import {Add} from "@mui/icons-material";
import {common} from "../../Styles/Blocks";
import {DraggableServiceColumn} from "../../Components/Items/Reuqests/Tracks/DraggableServiceColumn";
import {connect} from "react-redux";
import CreateService from "../../Components/Modals/Requests/Tracks/CreateService";

const getItems = (count, prefix) =>
  Array.from({length: count}, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`
    };
  });

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["todo", "inProgress", "done"];

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({...acc, [listKey]: getItems(10, listKey)}),
    {}
  );

const RequestsTracks = ({activities}) => {
  const [createServiceModal, setCreateServiceModal] = useState(false);
  const [elements, setElements] = React.useState(generateLists());

  useEffect(() => {
    setElements(generateLists());
    console.log('Elements', generateLists())
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = {...elements};

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
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
  null,
)(RequestsTracks);
