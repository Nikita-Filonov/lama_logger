import {Draggable} from "react-beautiful-dnd";
import React from "react";
import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";


export const DraggableService = ({service, index}) => {

  return (
    <Draggable draggableId={service.id?.toString()} index={index}>
      {(provided, snapshot) => <Card
        sx={{mb: 1.5}}
        ref={provided.innerRef}
        snapshot={snapshot}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <CardContent>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            {service?.title}
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<Add/>}>NEW TRACK</Button>
        </CardActions>
      </Card>}
    </Draggable>
  );
};
