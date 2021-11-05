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

  const onChange = async (value, index, key) =>
    setHeaders(headers.map((payload, i) => i === index ? {...payload, [key]: value} : payload));


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
