import React, {useState} from 'react';
import {CircularProgress, Container, Fab, List, Typography} from '@mui/material';
import {CreateProject} from "../../Components/Modals/Projects/CreateProject";
import {common, ViewRequestStyles} from "../../Styles/Blocks";
import {connect} from "react-redux";
import Project from "../../Components/Items/Projects/Project";
import {useProjects} from "../../Providers/ProjectsProvider";
import {EmptyList} from "../../Components/Blocks/Common/EmptyList";
import clsx from "clsx";
import {Search} from "../../Components/Blocks/Common/Search";
import {Add} from "@mui/icons-material";


const Projects = ({projects}) => {
  const classes = ViewRequestStyles();
  const {load} = useProjects();
  const [search, setSearch] = useState('')
  const [createProjectModal, setCreateProjectModal] = useState(false)

  const onCreateProject = () => setCreateProjectModal(true)

  return (
    <Container maxWidth={'xl'}>
      <div className={clsx('mt-3 d-flex justify-content-center align-items-center', classes.toolbarContainer)}>
        <Typography variant={'h6'}>Projects</Typography>
        <div className={'flex-grow-1'}/>
        <Search
          search={search}
          setSearch={setSearch}
          label={'Search projects'}
          placeholder={'Search by project name'}
        />
      </div>
      <List sx={{width: '100%', bgcolor: 'background.paper'}} className={'mt-3'}>
        {projects.length === 0 && !load && <EmptyList text={'You dont have any projects'}/>}
        {load && <CircularProgress style={common.spinner}/>}
        {projects.map(p => <Project project={p} key={p.id}/>)}
      </List>
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
