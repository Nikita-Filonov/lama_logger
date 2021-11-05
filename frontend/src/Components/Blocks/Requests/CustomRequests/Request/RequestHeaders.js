import React, {useCallback, useEffect, useState} from "react";
import {Button, Checkbox, IconButton, TextField} from "@mui/material";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {Add, Close} from "@mui/icons-material";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";

const RequestHeaders = ({disabled = false, customRequest, setCustomRequest}) => {
  const classes = CustomRequestsStyles();
  const [headers, setHeaders] = useState([]);

  useEffect(() => setHeaders(
    Object.keys(customRequest?.requestHeaders)
      .map(header => ({key: header, value: customRequest?.requestHeaders[header], include: true}))
  ), [customRequest?.requestHeaders])

  const onChange = useCallback(async (value, index, key) => {
      const newHeaders = headers.map((payload, i) => i === index ? {...payload, [key]: value} : payload);
      setHeaders(newHeaders);
      await updateHeadersPayload(newHeaders);
    }, [headers]
  );
  const onNewHeader = async () => {
    const newHeaders = [...headers, {key: '', value: '', include: true}];
    setHeaders(newHeaders);
    await updateHeadersPayload(newHeaders);
  };
  const onRemove = async (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
    await updateHeadersPayload(newHeaders);
  }

  const updateHeadersPayload = async (requestHeaders) => {
    let safeHeaders = {};
    for (let i = 0; i < requestHeaders.length; i++) {
      const key = headers[i].key;
      const value = headers[i].value;
      if (key && value) {
        safeHeaders[key] = value;
      }
    }
    setCustomRequest({...customRequest, safeHeaders})
  };

  return (
    <div className={classes.requestHeadersContainer}>
      {headers?.map(({key, value, include}, index) =>
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
            onChange={async event => await onChange(event.target.value, index, 'key')}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Key'}
          />
          <TextField
            disabled={disabled}
            value={value}
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
