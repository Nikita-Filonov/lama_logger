import {Draggable} from "react-beautiful-dnd";
import React from "react";
import {Card, CardActions, CardContent, Chip, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Add, DragHandle} from "@mui/icons-material";


export const DraggableService = ({service, index}) => {

  return (
    <Draggable draggableId={service.id?.toString()} index={index}>
      {(provided, snapshot) => <Card
        sx={{mb: 1.5}}
        ref={provided.innerRef}
        snapshot={snapshot}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        title={service?.title}
      >
        <CardContent>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            {service?.title}
          </Typography>
          <List dense>
            <ListItem button disableGutters>
              <Chip color="error" label={'5XX'} size={'small'}/>
              <ListItemText sx={{ml: 1}} primary={'some track'}/>
            </ListItem>
            <ListItem button disableGutters>
              <Chip color="error" label={'4XX'} size={'small'}/>
              <ListItemText sx={{ml: 1}} primary={'some track'}/>
            </ListItem>
            <ListItem button disableGutters>
              <Chip color="success" label={'200 OK'} size={'small'}/>
              <ListItemText sx={{ml: 1}} primary={'some track'}/>
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<Add/>}>NEW TRACK</Button>
          <div className={'flex-grow-1'}/>
          <DragHandle/>
        </CardActions>
      </Card>}
    </Draggable>
  );
};
