import React from "react";
import {Button, Checkbox, IconButton, TextField} from "@mui/material";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {Add, Close} from "@mui/icons-material";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import {parsePastedValue} from "../../../../../Utils/Utils/Filters";

const RequestHeaders = ({disabled = false, customRequest, setCustomRequest}) => {
  const classes = CustomRequestsStyles();

  const onChange = async (value, index, key) => {
    const requestHeaders = customRequest?.requestHeaders?.map((payload, i) =>
      i === index
        ? {...payload, [key]: value}
        : payload
    );
    setCustomRequest({...customRequest, requestHeaders});
  }
  const onNewHeader = async () => {
    const requestHeaders = [...customRequest?.requestHeaders, {key: '', value: '', include: true}];
    setCustomRequest({...customRequest, requestHeaders});
  }
  const onRemove = async (index) => {
    const requestHeaders = customRequest?.requestHeaders?.filter((_, i) => i !== index);
    setCustomRequest({...customRequest, requestHeaders});
  }

  const onPasteHeaders = async (event, index, key) => {
    const {result, isJson} = await parsePastedValue(event);

    isJson
      ? setCustomRequest({...customRequest, requestHeaders: [...customRequest?.requestHeaders, ...result]})
      : await onChange(result, index, key);
  }

  return (
    <div className={classes.requestHeadersContainer}>
      {customRequest?.requestHeaders?.map(({key, value, include}, index) =>
        <div className={'d-flex align-items-center'} key={index}>
          <Checkbox
            size={'small'}
            checked={include}
            onClick={async event => await onChange(event.target.checked, index, 'include')}
          />
          <TextField
            disabled={disabled}
            sx={{mr: 2}}
            value={key}
            onPaste={async event => await onPasteHeaders(event, index, 'key')}
            onChange={async event => await onChange(event.target.value, index, 'key')}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Key'}
          />
          <TextField
            disabled={disabled}
            value={value}
            onPaste={async event => await onPasteHeaders(event, index, 'value')}
            onChange={async event => await onChange(event.target.value, index, 'value')}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Value'}
          />
          <IconButton size={'small'} sx={{mr: 1}} onClick={async () => await onRemove(index)}>
            <Close fontSize={'small'}/>
          </IconButton>
        </div>
      )}
      <Button
        color={'inherit'}
        startIcon={<Add/>}
        size={'small'}
        sx={{ml: 1, mt: 1}}
        onClick={onNewHeader}
      >
        New header
      </Button>
    </div>
  )
}

const getState = (state) => ({
  customRequest: state.customRequests.customRequest,
})

export default connect(
  getState,
  {
    setCustomRequest
  },
)(RequestHeaders);
