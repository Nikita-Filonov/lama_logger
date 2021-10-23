import React, {useState} from "react";
import {Container, Fab, Grid} from "@mui/material";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {ServiceCard} from "../../Components/Items/Reuqests/Tracks/ServiceCard";
import {Add} from "@mui/icons-material";
import {common} from "../../Styles/Blocks";

const itemsFromBackend = [
  {id: 1, content: "First task"},
  {id: 2, content: "Second task"},
  {id: 3, content: "Third task"},
  {id: 4, content: "Fourth task"},
  {id: 5, content: "Fifth task"}
];

const columnsFromBackend = {
  1: {
    name: "Requested",
    items: itemsFromBackend
  },
  2: {
    name: "To do",
    items: []
  },
  3: {
    name: "In Progress",
    items: []
  },
};

export const RequestsTracks = () => {
  const [createTrackModal, setCreateTrackModal] = useState(false);
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    console.log(result)
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
      <Grid container spacing={2}>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Grid item xs={4}>
                <h2>{column.name}sadasd</h2>
                <div style={{margin: 8}}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightgrey"
                              : 'white',
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      <ServiceCard/>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </Grid>
            );
          })}
        </DragDropContext>
      </Grid>
      <Fab variant="extended" color={'primary'} style={common.fab} onClick={() => setCreateTrackModal(true)}>
        <Add sx={{mr: 1}}/>
        NEW SERVICE
      </Fab>
    </Container>
  )
}
