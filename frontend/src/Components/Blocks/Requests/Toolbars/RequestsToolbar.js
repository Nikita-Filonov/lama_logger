import React, {useState} from "react";
import {common, ViewRequestStyles} from "../../../../Styles/Blocks";
import clsx from "clsx";
import RequestsMenu from "../../../Menus/Requests/RequestsMenu";
import {Button, IconButton, MenuItem, Select, Typography} from "@mui/material";
import {connect} from "react-redux";
import {setRequestsTimeFilterModal} from "../../../../Redux/Requests/requestsActions";
import {Search} from "../../Common/Search";
import {AccessTime, Settings} from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import {useHistory} from "react-router-dom";
import {setProject} from "../../../../Redux/Projects/projectActions";


const RequestsToolbar = ({project, projects, setRequestsTimeFilterModal, setProject}) => {
  const classes = ViewRequestStyles();
  const history = useHistory();
  const [search, setSearch] = useState('')

  const onTimeFilters = () => setRequestsTimeFilterModal(true)
  const onSelectProject = (event) => {
    const selectedProject = projects.find(p => p.id === event.target.value)
    setProject(selectedProject)
    history.push(`/projects/${selectedProject.id}`);
  }

  return (
    <div className={clsx('mt-3 d-flex justify-content-center align-items-center', classes.toolbarContainer)}>
      <Typography variant={'h6'}>Requests</Typography>
      <FormControl variant="standard" sx={{width: 200}} className={'mt-2 ms-3'}>
        <Select
          size={'small'}
          value={project.id}
          disableUnderline
          renderValue={(projectId) => projects.find(p => p.id === projectId)?.title}
          onChange={onSelectProject}
        >
          {projects.map(p => <MenuItem value={p.id} className={'d-flex'} sx={{maxWidth: 300,}}>
            <Typography style={common.ellipsisText}>{p.title}</Typography>
            <div className={'flex-grow-1'}/>
            <IconButton size={'small'}><Settings fontSize={'small'}/></IconButton>
          </MenuItem>)}
        </Select>
      </FormControl>
      <div className={'flex-grow-1'}/>
      <Search
        search={search}
        setSearch={setSearch}
        label={'Search requests'}
        placeholder={'Search by url, code, method'}
      />
      <Button className={'me-5'} startIcon={<AccessTime/>} color={'inherit'} onClick={onTimeFilters}>
        Time filters
      </Button>
      <RequestsMenu/>
    </div>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  projects: state.projects.projects,
})

export default connect(
  getState,
  {
    setProject,
    setRequestsTimeFilterModal
  },
)(RequestsToolbar);
