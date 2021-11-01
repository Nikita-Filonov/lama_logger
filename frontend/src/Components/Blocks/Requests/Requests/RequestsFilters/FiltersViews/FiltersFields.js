import React, {useState} from "react";
import RequestsSideDomainFilters from "../RequestsSideDomainFilters";
import {Button, Checkbox, Divider, FormControlLabel, FormGroup, Typography} from "@mui/material";
import RequestsSideBodyFilters from "../RequestsSideBodyFilters";
import RequestsSideHeadersFilters from "../HeadersFilters/RequestsSideHeadersFilters";
import RequestsSideStatusCodesFilters from "../RequestsSideStatusCodesFilters";
import {AccessTime, SaveOutlined} from "@mui/icons-material";
import {connect} from "react-redux";
import {
  setRequestsFilters,
  setRequestsTimeFilterModal
} from "../../../../../../Redux/Requests/Requests/requestsActions";
import SaveFilters from "../../../../../Modals/Requests/Requests/Filters/SaveFilters";

const FiltersFields = (props) => {
  const {
    projectSettings,
    requestsFilters,
    setRequestsFilters,
    setRequestsTimeFilterModal
  } = props;
  const [saveFiltersModal, setSaveFiltersModal] = useState(false);

  const onRequestTimeFilter = () => setRequestsTimeFilterModal(true);
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
    <React.Fragment>
      <RequestsSideDomainFilters/>
      <Divider sx={{marginTop: 1.5, marginBottom: 1.5}}/>
      <RequestsSideBodyFilters/>
      <Divider sx={{marginTop: 1.5, marginBottom: 1.5}}/>
      <RequestsSideHeadersFilters/>
      <Divider sx={{marginTop: 1.5, marginBottom: 1.5}}/>
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
      <Button
        size={'small'}
        startIcon={<SaveOutlined fontSize={'small'}/>}
        fullWidth
        className={'justify-content-start mt-2'}
        onClick={() => setSaveFiltersModal(true)}
      >
        Save filters
      </Button>
      <SaveFilters modal={saveFiltersModal} setModal={setSaveFiltersModal}/>
    </React.Fragment>
  )
}

const getState = (state) => ({
  projectSettings: state.projects.projectSettings,
  requestsFilters: state.requests.requestsFilters,
})

export default connect(
  getState,
  {
    setRequestsFilters,
    setRequestsTimeFilterModal
  },
)(FiltersFields);
