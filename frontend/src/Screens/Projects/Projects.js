import React, {useState} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Container, Fab} from "@material-ui/core";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {CreateProject} from "../../Components/Modals/Projects/CreateProject";
import {Add} from "@material-ui/icons";
import {comp} from "../../Styles/Blocks";


export const Projects = () => {
  const [createProjectModal, setCreateProjectModal] = useState(false)

  const onCreateProject = () => setCreateProjectModal(true)

  return (
    <Container>
      {/*<div className={'d-flex mt-2'}>*/}
      {/*  <Button className={'ms-auto'} onClick={onCreateProject} variant="outlined">*/}
      {/*    Create project*/}
      {/*  </Button>*/}
      {/*</div>*/}
      <List
        sx={{width: '100%', bgcolor: 'background.paper'}}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Projects
          </ListSubheader>
        }
        className={'mt-3'}
      >
        <ListItemButton>
          <ListItemIcon>
            <FormatListBulletedIcon/>
          </ListItemIcon>
          <ListItemText primary="Sent mail"/>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FormatListBulletedIcon/>
          </ListItemIcon>
          <ListItemText primary="Sent mail"/>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FormatListBulletedIcon/>
          </ListItemIcon>
          <ListItemText primary="Sent mail"/>
        </ListItemButton>
      </List>
      <Fab variant="extended" style={comp.fab} onClick={onCreateProject}>
        <Add sx={{mr: 1}}/>
        CREATE
      </Fab>
      <CreateProject modal={createProjectModal} setModal={setCreateProjectModal}/>
    </Container>
  )
}
