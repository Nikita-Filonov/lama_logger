import React, {useState} from "react";
import {Box, Checkbox, FormControlLabel, FormGroup, IconButton, Popover, Typography} from "@mui/material";
import {REQUESTS_STATUS_CODES_TYPES} from "../../../../../Utils/Constants";
import {StatusCodeIndicator} from "../StatusCodeIndicator";
import {MoreHoriz} from "@mui/icons-material";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../../Redux/Requests/Requests/requestsActions";
import {StatusCodesAutocomplete} from "../../Settings/Requests/Filters/StatusCodesAutocomplete";


const RequestsSideStatusCodesFilters = (props) => {
  const {requestsFilters, projectSettings, setRequestsFilters} = props;
  const [statusCodesMenu, setStatusCodesMenu] = useState(null);
  const [selectedCodes, setSelectedCodes] = useState({type: 'success', value: [], options: []})

  const onOpenMenu = (event, type) => {
    setStatusCodesMenu(event.currentTarget);
    setSelectedCodes({
      type,
      options: projectSettings?.filterStatusCodes[type],
      value: requestsFilters?.statusCodes[type]
    })
  };
  const onCloseMenu = () => setStatusCodesMenu(null);

  const onStatusCodes = (event) => {
    let selectedStatusCodes = requestsFilters.statusCodes;
    const settingsCodes = projectSettings.filterStatusCodes;

    if (event?.checked) {
      selectedStatusCodes[event.value] = settingsCodes[event.value];
    } else {
      delete selectedStatusCodes[event.value];
    }
    setRequestsFilters({...requestsFilters, statusCodes: {...selectedStatusCodes}})
  }

  const onChangesStatusCodes = (type, newValue) => {
    setRequestsFilters({
      ...requestsFilters,
      statusCodes: {...requestsFilters?.statusCodes, [type]: newValue.map(Number)}
    })
    setSelectedCodes({...selectedCodes, value: newValue})
  }

  return (
    <FormGroup>
      <Typography variant={'subtitle2'} className={'mt-2'}>Status codes</Typography>
      {REQUESTS_STATUS_CODES_TYPES.map((codes, index) =>
        <div className={'d-flex align-items-center'}>
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                size={'small'}
                color={'primary'}
                value={codes?.value}
                checked={Object.keys(requestsFilters?.statusCodes)?.indexOf(codes?.value) !== -1}
                onClick={event => onStatusCodes(event.target, 'statusCodes')}
              />
            }
            label={<StatusCodeIndicator statusCode={codes?.code}/>}
          />
          <div className={'flex-grow-1'}/>
          <IconButton size={'small'} onClick={event => onOpenMenu(event, codes?.value)}>
            <MoreHoriz fontSize={'small'}/>
          </IconButton>
        </div>
      )}

      <Popover
        disableScrollLock={false}
        onClose={onCloseMenu}
        open={Boolean(statusCodesMenu)}
        anchorEl={statusCodesMenu}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'bottom', horizontal: 'left'}}
      >
        <Box sx={{p: 2, maxWidth: 400}}>
          <StatusCodesAutocomplete
            type={selectedCodes.type}
            load={requestsFilters}
            value={selectedCodes.value}
            options={selectedCodes.options}
            onChange={onChangesStatusCodes}
          />
        </Box>
      </Popover>
    </FormGroup>
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
  },
)(RequestsSideStatusCodesFilters);
