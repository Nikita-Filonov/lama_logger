import {Draggable} from "react-beautiful-dnd";
import React from "react";
import {Card, CardActions, CardContent, Chip, List, ListItem, ListItemText, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Add, DragHandle} from "@mui/icons-material";
import {connect} from "react-redux";
import {setCreateTrackModal, setService, setTrack} from "../../../../Redux/Requests/Tracks/tracksActions";
import {useHistory} from "react-router-dom";


const DraggableService = (props) => {
  const {service, index, setService, setCreateTrackModal, project, setTrack} = props;
  const {palette} = useTheme();
  const history = useHistory();

  const onCreateTrack = () => {
    setCreateTrackModal(true);
    setService(service)
  }

  const onTrack = (track) => {
    setTrack(track);
    history.push(`/projects/${project.id}/tracks/${track.id}`);
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
            {service?.tracks?.map(track =>
              <ListItem button disableGutters key={track.id} onClick={() => onTrack(track)}>
                <Chip color="error" label={'5XX'} size={'small'}/>
                <ListItemText sx={{ml: 1}} primary={'some track'}/>
              </ListItem>
            )}
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

const getState = (state) => ({
  project: state.projects.project
})

export default connect(
  getState,
  {
    setTrack,
    setService,
    setCreateTrackModal
  },
)(DraggableService);
