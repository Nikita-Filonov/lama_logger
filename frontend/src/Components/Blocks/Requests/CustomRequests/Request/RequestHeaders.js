import React, {useEffect, useState} from "react";
import {Checkbox, IconButton, TextField} from "@mui/material";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {Close} from "@mui/icons-material";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";

const RequestHeaders = ({disabled = false, customRequest, setCustomRequest}) => {
  const classes = CustomRequestsStyles();
  const [headers, setHeaders] = useState([]);

  useEffect(() => setHeaders(
    Object.keys(customRequest?.requestHeaders)
      .map(header => ({key: header, value: customRequest?.requestHeaders[header], include: true}))
  ), [customRequest?.requestHeaders])

  const onInclude = async (event, index) =>
    setHeaders(headers.map((payload, i) => i === index ? {...payload, include: event.target.checked} : payload));

  return (
    <div className={classes.requestHeadersContainer}>
      {headers?.map(({key, value, include}, index) =>
        <div className={'d-flex align-items-center'} key={index}>
          <Checkbox size={'small'} checked={include} onClick={async event => await onInclude(event, index)}/>
          <TextField
            disabled={disabled}
            sx={{mr: 2}}
            value={key}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Key'}
          />
          <TextField
            disabled={disabled}
            value={value}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Value'}
          />
          <IconButton size={'small'} sx={{mr: 1}}>
            <Close fontSize={'small'}/>
          </IconButton>
        </div>
      )}
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
