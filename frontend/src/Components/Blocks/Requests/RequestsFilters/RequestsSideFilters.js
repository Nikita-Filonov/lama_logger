import React, {useEffect} from "react";
import {Divider, IconButton, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {Close} from "@material-ui/icons";
import {setRequestsFilters, setRequestsFiltersSidebar} from "../../../../Redux/Requests/requestsActions";
import {RequestsTableStyles} from "../../../../Styles/Blocks";
import clsx from "clsx";
import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import {StatusCodeIndicator} from "../StatusCodeIndicator";
import {REQUESTS_METHODS_FILTERS, REQUESTS_SUCCESSES_FILTERS} from "../../../../Utils/Constants";

const RequestsSideFilters = (props) => {
  const {requestsFiltersSidebar, setRequestsFiltersSidebar, requestsFilters, setRequestsFilters} = props;
  const classes = RequestsTableStyles();

  const onClose = () => setRequestsFiltersSidebar(true)

  useEffect(() =>
      localStorage.setItem('requestsFilters', JSON.stringify(requestsFilters)),
    [requestsFilters]
  )

  const onMethod = (event, filter = 'methods') => {
    console.log(event.value, filter, requestsFilters)
    let selectedMethods;
    if (event?.checked) {
      selectedMethods = [...requestsFilters[filter], event.value]
    } else {
      selectedMethods = requestsFilters[filter].filter(m => m !== event.value)
    }
    setRequestsFilters({...requestsFilters, [filter]: [...selectedMethods]})
  }

  return (
    <Box sx={{width: 200, marginRight: 2}} hidden={requestsFiltersSidebar}>
      <Paper className={clsx(classes.tableContainer, 'p-1 ps-2')}>
        <div className={'d-flex'}>
          <div className={'flex-grow-1'}/>
          <IconButton size={'small'} onClick={onClose}>
            <Close fontSize={'small'}/>
          </IconButton>
        </div>
        <Divider/>
        <FormGroup>
          <Typography variant={'subtitle2'} className={'mt-2'}>Methods</Typography>
          {REQUESTS_METHODS_FILTERS.map((method, index) =>
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={requestsFilters.methods.indexOf(method) !== -1}
                  onClick={event => onMethod(event.target, 'methods')}
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
        <FormGroup>
          <Typography variant={'subtitle2'} className={'mt-2'}>Status codes</Typography>
          {REQUESTS_SUCCESSES_FILTERS.map((successes, index) =>
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  size={'small'}
                  color={'primary'}
                  value={successes?.value}
                  checked={requestsFilters.successes.indexOf(successes?.value) !== -1}
                  onClick={event => onMethod(event.target, 'successes')}
                />
              }
              label={<StatusCodeIndicator statusCode={successes?.code}/>}
            />
          )}
        </FormGroup>
        <Divider/>
        <FormGroup>
          <Typography variant={'subtitle2'} className={'mt-2'}>Time</Typography>

        </FormGroup>
      </Paper>
    </Box>
  )
}


const getState = (state) => ({
  requestsFilters: state.requests.requestsFilters,
  requestsFiltersSidebar: state.requests.requestsFiltersSidebar
})

export default connect(
  getState,
  {
    setRequestsFilters,
    setRequestsFiltersSidebar
  },
)(RequestsSideFilters);
