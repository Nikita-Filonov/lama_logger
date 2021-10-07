import React, {useState} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import {Fab} from '@mui/material';
import {CircularProgress, Container} from "@material-ui/core";
import {CreateProject} from "../../Components/Modals/Projects/CreateProject";
import {Add} from "@material-ui/icons";
import {comp} from "../../Styles/Blocks";
import {connect} from "react-redux";
import Project from "../../Components/Items/Projects/Project";
import {useProjects} from "../../Providers/ProjectsProvider";
import {EmptyList} from "../../Components/Other/EmptyList";


const Projects = ({projects}) => {
  const {load} = useProjects();
  const [createProjectModal, setCreateProjectModal] = useState(false)

  const onCreateProject = () => setCreateProjectModal(true)

  return (
    <Container maxWidth={'xl'}>
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
        {projects.length === 0 && !load && <EmptyList text={'You dont have any projects'}/>}
        {load && <CircularProgress style={comp.spinner}/>}
        {projects.map(p => <Project project={p} key={p.id}/>)}
      </List>
      <Fab variant="extended" color={'primary'} style={comp.fab} onClick={onCreateProject}>
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
