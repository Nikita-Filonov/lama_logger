import React, {memo, useCallback} from "react";
import {Box, Button, IconButton, Popover, TextField, Typography} from "@mui/material";
import {Add, Close} from "@mui/icons-material";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../../../Redux/Requests/Requests/requestsActions";
import {Autocomplete} from "@mui/lab";

const HeadersPopover = (props) => {
  const {menu, onClose, requestsFilters, projectSettings, setRequestsFilters} = props;

  const onNewHeader = () => setRequestsFilters({
    ...requestsFilters,
    headers: [...requestsFilters?.headers, {key: '', value: ''}]
  })

  const onRemoveHeader = (index) => {
    const copyHeaders = [...requestsFilters?.headers];
    copyHeaders.splice(index, 1);
    setRequestsFilters({...requestsFilters, headers: [...copyHeaders]});
  }

  const onChangeHeader = useCallback(async (type = 'key', index, value) => {
    setRequestsFilters({
      ...requestsFilters,
      headers: requestsFilters?.headers?.map((header, i) => i === index ? {...header, [type]: value} : header)
    })
  }, [requestsFilters?.headers])


  return (
    <Popover
      disableScrollLock={false}
      onClose={onClose}
      open={Boolean(menu)}
      anchorEl={menu}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      transformOrigin={{vertical: 'bottom', horizontal: 'left'}}
    >
      <Box sx={{p: 2, minWidth: 400, maxWidth: 400, maxHeight: 500}}>
        <Typography>Headers filters</Typography>
        {requestsFilters?.headers.map((header, index) =>
          <div key={index} className={'d-flex justify-content-center align-items-center mt-2'}>
            <Autocomplete
              fullWidth
              freeSolo
              disableClearable
              value={header?.key}
              options={projectSettings?.filterHeaders?.keys}
              onSelect={async (event, _) => await onChangeHeader('key', index, event.target.value)}
              onChange={async (_, value) => await onChangeHeader('key', index, value)}
              renderInput={(params) => (
                <TextField{...params} label={'Key'} variant="standard" placeholder={'Key'} className={'me-1'}/>
              )}
            />
            <Autocomplete
              fullWidth
              freeSolo
              disableClearable
              value={header?.value}
              options={projectSettings?.filterHeaders?.values}
              onSelect={async (event, _) => await onChangeHeader('value', index, event.target.value)}
              onChange={async (_, value) => await onChangeHeader('value', index, value)}
              renderInput={(params) => (
                <TextField{...params} label={'Value'} variant="standard" placeholder={'Value'} className={'ms-1'}/>
              )}
            />
            <IconButton size={'small'} sx={{mt: 2}} onClick={() => onRemoveHeader(index)}>
              <Close fontSize={'small'}/>
            </IconButton>
          </div>
        )}
        <Button onClick={onNewHeader} startIcon={<Add/>} size={'small'} color={'inherit'} className={'mt-2'}>
          New header
        </Button>
      </Box>
    </Popover>
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
)(memo(HeadersPopover));
