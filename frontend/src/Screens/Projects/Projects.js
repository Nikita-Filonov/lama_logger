import React, {useState} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import {Container, Fab} from "@material-ui/core";
import {CreateProject} from "../../Components/Modals/Projects/CreateProject";
import {Add} from "@material-ui/icons";
import {comp} from "../../Styles/Blocks";
import {connect} from "react-redux";
import Project from "../../Components/Items/Project";


const Projects = ({projects}) => {
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
        {projects.map(p => <Project project={p} key={p.id}/>)}
      </List>
      <Fab variant="extended" style={comp.fab} onClick={onCreateProject}>
        <Add sx={{mr: 1}}/>
        CREATE
      </Fab>
      <CreateProject modal={createProjectModal} setModal={setCreateProjectModal}/>
    </Container>
  )
}

const getState = (state) => ({
  projects: state.projects.projects
})

export default connect(
  getState,
  null,
)(Projects);
