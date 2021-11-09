import React, {useState} from "react";
import {Divider, IconButton, Paper, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {Close, FilterList, Settings} from "@mui/icons-material";
import {RequestsTableStyles} from "../../../../../Styles/Blocks";
import {setRequestsFiltersSidebar} from "../../../../../Redux/Requests/Requests/requestsActions";
import {useHistory} from "react-router-dom";
import FiltersFields from "./FiltersViews/FiltersFields";
import SavedFilters from "./FiltersViews/SavedFilters";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const RequestsSideFilters = (props) => {
  const {
    project,
    requestsFiltersSidebar,
    setRequestsFiltersSidebar,
  } = props;
  const history = useHistory();
  const classes = RequestsTableStyles();
  const [view, setView] = useState('fields');

  const onClose = () => setRequestsFiltersSidebar(true);
  const onSettings = () => history.push(`/projects/${project.id}/settings/filters`);
  const onView = () => setView(view === 'fields' ? 'saved' : 'fields');

  return (
    <Box sx={{width: 200, mr: 2}} hidden={requestsFiltersSidebar}>
      <Paper className={'p-1 ps-2 pb-2'}>
        <div className={'d-flex'}>
          <Tooltip title={'Filters settings'} placement={'top'}>
            <IconButton size={'small'} onClick={onSettings}>
              <Settings fontSize={'small'}/>
            </IconButton>
          </Tooltip>
          <Tooltip title={view === 'fields' ? 'Filters fields' : 'Saved filters'} placement={'top'}>
            <IconButton size={'small'} sx={{ml: .5}} onClick={onView}>
              {view === 'fields' ? <FormatListBulletedIcon fontSize={'small'}/> : <FilterList fontSize={'small'}/>}
            </IconButton>
          </Tooltip>
          <div className={'flex-grow-1'}/>
          <IconButton size={'small'} onClick={onClose}>
            <Close fontSize={'small'}/>
          </IconButton>
        </div>
        <Divider/>
        <Box className={classes.sideBarFiltersContainer}>
          {view === 'fields' ? <FiltersFields/> : <SavedFilters/>}
        </Box>
      </Paper>
    </Box>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  requestsFiltersSidebar: state.requests.requestsFiltersSidebar
})

export default connect(
  getState,
  {
    setRequestsFiltersSidebar,
  },
)(RequestsSideFilters);
