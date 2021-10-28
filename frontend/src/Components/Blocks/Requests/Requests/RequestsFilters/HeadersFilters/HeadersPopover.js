import React from "react";
import {Box, Button, Divider, IconButton, Popover, TextField, Tooltip, Typography} from "@mui/material";
import {Add, Close} from "@mui/icons-material";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../../../Redux/Requests/Requests/requestsActions";

const HeadersPopover = ({menu, onClose, requestsFilters, setRequestsFilters}) => {

  const onNewHeader = () => {
    let headerId = Math.max.apply(null, requestsFilters?.headers?.map(header => header?.id));
    setRequestsFilters({
      ...requestsFilters,
      headers: [
        ...requestsFilters?.headers,
        {'': '', id: headerId === (Number.NEGATIVE_INFINITY || Number.POSITIVE_INFINITY) ? 1 : ++headerId}
      ]
    })
  };
  const onRemoveHeader = (index) => {
    const copyHeaders = [...requestsFilters?.headers];
    copyHeaders.splice(index, 1);
    setRequestsFilters({...requestsFilters, headers: [...copyHeaders]});
  }

  const onChangeKey = async (index, value) => {
    const headers = [...requestsFilters.headers];
    setRequestsFilters({
      ...requestsFilters,
      headers: headers.map((header, i) => i === index
        ? {[value]: Object.values(header)[0], id: header.id}
        : header
      )
    });
  }

  const onChangeValue = async (index, value) => {
    const headers = [...requestsFilters.headers];
    setRequestsFilters({
      ...requestsFilters,
      headers: headers.map((header, i) => i === index
        ? {[Object.keys(header)[0]]: value, id: header.id}
        : header
      )
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
        {requestsFilters?.headers
          .sort((a, b) => a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0))
          .map((header, index) =>
            <div key={header.id} className={'d-flex justify-content-center align-items-center mt-2'}>
              <TextField
                value={Object.keys(header)[0]}
                variant={'standard'}
                size={'small'}
                placeholder={'Key'}
                label={'Key'}
                className={'me-1'}
                onChange={async event => await onChangeKey(index, event.target.value)}
              />
              <TextField
                value={Object.values(header)[0]}
                variant={'standard'}
                size={'small'}
                placeholder={'Value'}
                label={'Value'}
                className={'ms-1'}
                onChange={async event => await onChangeValue(index, event.target.value)}
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
