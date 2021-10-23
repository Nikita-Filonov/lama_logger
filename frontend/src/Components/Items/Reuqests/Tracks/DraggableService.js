import {Draggable} from "react-beautiful-dnd";
import React from "react";
import {Card, CardActions, CardContent, Chip, List, ListItem, ListItemText, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Add, DragHandle} from "@mui/icons-material";
import {connect} from "react-redux";
import {setCreateTrackModal, setService} from "../../../../Redux/Requests/Tracks/tracksActions";


const DraggableService = ({service, index, setService, setCreateTrackModal}) => {
  const {palette} = useTheme();

  const onCreateTrack = () => {
    setCreateTrackModal(true);
    setService(service)
  }

  return (
    <Draggable draggableId={service.id?.toString()} index={index}>
      {(provided, snapshot) => <Card
        sx={{mb: 1.5, backgroundColor: snapshot.isDragging && (palette.mode === 'dark' ? '#535353' : '#DDDDDD')}}
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
          <Button size="small" startIcon={<Add/>} onClick={onCreateTrack}>NEW TRACK</Button>
          <div className={'flex-grow-1'}/>
          <DragHandle/>
        </CardActions>
      </Card>}
    </Draggable>
  );
};

export default connect(
  null,
  {
    setService,
    setCreateTrackModal
  },
)(DraggableService);
