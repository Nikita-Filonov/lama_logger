import React, {useState} from 'react';
import {Container, Fab} from '@mui/material';
import {CreateProject} from "../../Components/Modals/Projects/CreateProject";
import {common} from "../../Styles/Blocks";
import {Add} from "@mui/icons-material";
import ProjectsTable from "../../Components/Blocks/Projects/ProjectsTable/ProjectsTable";
import {ProjectsToolbar} from "../../Components/Blocks/Projects/Toolbars/ProjectsToolbar";


export const Projects = () => {
  const [createProjectModal, setCreateProjectModal] = useState(false)

  const onCreateProject = () => setCreateProjectModal(true)

  return (
    <Container maxWidth={'xl'}>
      <ProjectsToolbar/>
      <div className={'mt-3'}>
        <ProjectsTable/>
      </div>
      <Fab variant="extended" color={'primary'} style={common.fab} onClick={onCreateProject}>
        <Add sx={{mr: 1}}/>
        CREATE
      </Fab>
      <CreateProject modal={createProjectModal} setModal={setCreateProjectModal}/>
    </Container>
  )
}
