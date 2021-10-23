import React from "react";
import {Droppable} from "react-beautiful-dnd";
import {DraggableService} from "./DraggableService";
import {Grid, Typography} from "@mui/material";


export const DraggableServiceColumn = ({activity}) => {
  return (
    <Grid item xs>
      <Typography sx={{mb: 1}} variant={'subtitle1'}>{activity?.title}</Typography>
      <Droppable droppableId={`${activity.id}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {activity?.services?.map((service, index) => (
              <DraggableService key={service.id} service={service} index={index}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Grid>
  )
}
