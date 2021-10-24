import React, {useState} from "react";
import {Chip, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {DragHandle} from "@mui/icons-material";
import {Draggable, Droppable} from "react-beautiful-dnd";


export const Activity = ({activity, index}) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <Droppable droppableId={`${activity.id}`}>
      {(provided, _) =>
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Draggable draggableId={activity.id?.toString()} index={index} onDragStart={() => alert(111)}>
            {(provided, snapshot) =>
              <React.Fragment>
                <ListItem
                  key={activity.id}
                  button
                  snapshot={snapshot}
                  onClick={() => setCollapse(!collapse)}
                  ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps}
                >
                  <ListItemIcon>
                    <DragHandle/>
                  </ListItemIcon>
                  <ListItemText primary={activity.title}/>
                  <Chip label={`${activity?.services?.length} services`} variant="outlined" sx={{mr: 2}}/>
                  {collapse ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse component="li" in={!snapshot.isDragging && collapse} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {activity?.services?.map(service =>
                      <ListItem key={service.id} button sx={{pl: 4}}>
                        <ListItemText primary={service.title}/>
                        <Chip label={`${service?.tracks?.length} tracks`} variant="outlined" sx={{mr: 2}}/>
                      </ListItem>
                    )}
                  </List>
                </Collapse>
              </React.Fragment>
            }
          </Draggable>
          {provided.placeholder}
        </div>
      }
    </Droppable>
  )
}
