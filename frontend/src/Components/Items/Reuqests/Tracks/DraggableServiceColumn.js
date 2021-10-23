import React from "react";
import {Droppable} from "react-beautiful-dnd";
import {DraggableService} from "./DraggableService";
import {Grid, Typography} from "@mui/material";


export const DraggableServiceColumn = ({activity}) => {
  return (
    <Grid item xs>
      <Typography>{activity?.title}</Typography>
      <Droppable droppableId={`${activity.id}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {activity?.services?.map((item, index) => (
              <DraggableService key={item.id} item={item} index={index}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Grid>
  )
}
