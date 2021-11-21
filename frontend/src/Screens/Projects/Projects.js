import React, {useState} from 'react';
import {Container, Fab, Grid} from '@mui/material';
import {CreateProject} from "../../Components/Modals/Projects/CreateProject";
import {common} from "../../Styles/Blocks";
import {Add} from "@mui/icons-material";
import {ProjectsToolbar} from "../../Components/Blocks/Projects/ProjectsToolbar";
import {connect} from "react-redux";
import Project from "../../Components/Items/Projects/Project";
import {useProjects} from "../../Providers/ProjectsProvider";
import {ProjectsSkeletons} from "../../Components/Blocks/Projects/ProjectsSkeletons";
import {EmptyList} from "../../Components/Blocks/Common/EmptyList";

const Projects = ({projects}) => {
  const {load} = useProjects();
  const [search, setSearch] = useState('');
  const [createProjectModal, setCreateProjectModal] = useState(false);

  const onCreateProject = () => setCreateProjectModal(true);

  return (
    <Container maxWidth={'xl'}>
      <ProjectsToolbar
        search={search}
        setSearch={setSearch}
        placeholder={'Search by project name'}
        title={'Projects'}
      />
      {projects?.length === 0 && !load &&
      <EmptyList text={'There is no projects'} description={'Click on "Create" to create new one'}/>}
      <div className={'d-flex mt-3 mb-3'}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {load
            ? <ProjectsSkeletons/>
            : projects.map(project => <Project key={project.id} project={project}/>)
          }
        </Grid>
      </div>

      <Fab variant="extended" color={'primary'} style={common.fab} onClick={onCreateProject}>
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
