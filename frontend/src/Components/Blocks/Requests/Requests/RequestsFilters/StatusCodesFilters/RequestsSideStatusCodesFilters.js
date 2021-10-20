import React, {useState} from "react";
import {Checkbox, FormControlLabel, FormGroup, IconButton, Popover, Typography} from "@mui/material";
import {REQUESTS_STATUS_CODES_TYPES} from "../../../../../../Utils/Constants";
import {StatusCodeIndicator} from "../../StatusCodeIndicator";
import {MoreHoriz} from "@mui/icons-material";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../../../Redux/Requests/Requests/requestsActions";


const RequestsSideStatusCodesFilters = (props) => {
  const {requestsFilters, projectSettings, setRequestsFilters} = props;
  const [statusCodesMenu, setStatusCodesMenu] = useState(null);

  const onOpenMenu = (event) => setStatusCodesMenu(event.currentTarget);
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
          <IconButton size={'small'} onClick={onOpenMenu}>
            <MoreHoriz fontSize={'small'}/>
          </IconButton>
        </div>
      )}

      <Popover
        onClose={onCloseMenu}
        open={Boolean(statusCodesMenu)}
        anchorEl={statusCodesMenu}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'bottom', horizontal: 'left'}}
      >
        The content of the Popover.
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
