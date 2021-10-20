import React from "react";
import {Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {AccessTime, Close, Settings} from "@mui/icons-material";
import {RequestsTableStyles} from "../../../../../Styles/Blocks";
import {
  setRequestsFilters,
  setRequestsFiltersSidebar,
  setRequestsTimeFilterModal
} from "../../../../../Redux/Requests/Requests/requestsActions";
import {useHistory} from "react-router-dom";
import clsx from "clsx";
import RequestsSideStatusCodesFilters from "./StatusCodesFilters/RequestsSideStatusCodesFilters";

const RequestsSideFilters = (props) => {
  const {
    project,
    projectSettings,
    requestsFiltersSidebar,
    setRequestsFiltersSidebar,
    requestsFilters,
    setRequestsFilters,
    setRequestsTimeFilterModal
  } = props;
  const history = useHistory();
  const classes = RequestsTableStyles();

  const onClose = () => setRequestsFiltersSidebar(true);
  const onRequestTimeFilter = () => setRequestsTimeFilterModal(true);
  const onSettings = () => history.push(`/projects/${project.id}/settings/filters`);

  const onFilter = (event, filter = 'methods') => {
    let selectedMethods;
    if (event?.checked) {
      selectedMethods = [...requestsFilters[filter], event.value]
    } else {
      selectedMethods = requestsFilters[filter].filter(m => m !== event.value)
    }
    setRequestsFilters({...requestsFilters, [filter]: [...selectedMethods]})
  }

  return (
    <Box sx={{width: 200, mr: 2}} hidden={requestsFiltersSidebar}>
      <Paper className={clsx('p-1 ps-2', classes.sideBarFiltersContainer, classes.tableContainer)}>
        <div className={'d-flex'}>
          <IconButton size={'small'} onClick={onSettings}>
            <Settings fontSize={'small'}/>
          </IconButton>
          <div className={'flex-grow-1'}/>
          <IconButton size={'small'} onClick={onClose}>
            <Close fontSize={'small'}/>
          </IconButton>
        </div>
        <Divider/>
        <FormGroup>
          <Typography variant={'subtitle2'} className={'mt-2'}>Methods</Typography>
          {projectSettings?.filterMethods?.map((method, index) =>
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={requestsFilters.methods.indexOf(method) !== -1}
                  onClick={event => onFilter(event.target, 'methods')}
                  value={method}
                  size={'small'}
                  color={'primary'}
                />
              }
              label={method}
            />
          )}
        </FormGroup>
        <Divider/>
        <RequestsSideStatusCodesFilters/>
        <Divider/>
        <Typography variant={'subtitle2'} className={'mt-2'}>Time</Typography>
        <Button
          onClick={onRequestTimeFilter}
          size={'small'}
          startIcon={<AccessTime fontSize={'small'}/>}
          color={'inherit'}
          fullWidth
          className={'justify-content-start'}
        >
          Time filters
        </Button>
        <Divider className={'mt-2'}/>
      </Paper>
    </Box>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  projectSettings: state.projects.projectSettings,
  requestsFilters: state.requests.requestsFilters,
  requestsFiltersSidebar: state.requests.requestsFiltersSidebar
})

export default connect(
  getState,
  {
    setRequestsFilters,
    setRequestsFiltersSidebar,
    setRequestsTimeFilterModal
  },
)(RequestsSideFilters);
