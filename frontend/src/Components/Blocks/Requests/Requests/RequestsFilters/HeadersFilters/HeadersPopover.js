import React from "react";
import {Box, Button, IconButton, Popover, TextField, Typography} from "@mui/material";
import {Add, Close} from "@mui/icons-material";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../../../Redux/Requests/Requests/requestsActions";

const HeadersPopover = ({menu, onClose, requestsFilters, setRequestsFilters}) => {

  const onNewHeader = () => setRequestsFilters({
    ...requestsFilters,
    headers: [...requestsFilters?.headers, {key: '', value: ''}]
  })

  const onRemoveHeader = (index) => {
    const copyHeaders = [...requestsFilters?.headers];
    copyHeaders.splice(index, 1);
    setRequestsFilters({...requestsFilters, headers: [...copyHeaders]});
  }

  const onChangeHeader = async (type = 'key', index, value) => {
    setRequestsFilters({
      ...requestsFilters,
      headers: requestsFilters?.headers?.map((header, i) => i === index ? {...header, [type]: value} : header)
    });
  }


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
            <TextField
              value={header?.key}
              variant={'standard'}
              size={'small'}
              placeholder={'Key'}
              label={'Key'}
              className={'me-1'}
              onChange={async event => await onChangeHeader('key', index, event.target.value)}
            />
            <TextField
              value={header?.value}
              variant={'standard'}
              size={'small'}
              placeholder={'Value'}
              label={'Value'}
              className={'ms-1'}
              onChange={async event => await onChangeHeader('value', index, event.target.value)}
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
  requestsFilters: state.requests.requestsFilters,
})

export default connect(
  getState,
  {
    setRequestsFilters,
  },
)(HeadersPopover);
