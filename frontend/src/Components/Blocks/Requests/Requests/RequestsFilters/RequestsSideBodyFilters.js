import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../../Redux/Requests/Requests/requestsActions";
import {TextField, Typography} from "@mui/material";

const RequestsSideBodyFilters = ({requestsFilters, setRequestsFilters}) => {
  const [requestBody, setRequestBody] = useState(requestsFilters?.body?.requestBody);
  const [responseBody, setResponseBody] = useState(requestsFilters?.body?.responseBody);

  useEffect(() => {
    const timeoutSearch = setTimeout(async () =>
      setRequestsFilters({...requestsFilters, body: {responseBody, requestBody}}), 700)
    return () => clearTimeout(timeoutSearch);
  }, [requestBody, responseBody]);

  return (
    <React.Fragment>
      <Typography variant={'subtitle2'} className={'mt-2'}>Body</Typography>
      <TextField
        value={requestBody}
        onChange={event => setRequestBody(event.target.value)}
        label={'Request body'}
        variant={'standard'}
        size={'small'}
        placeholder={'{"id": 1}'}
        className={'mt-2'}
      />
      <TextField
        value={responseBody}
        onChange={event => setResponseBody(event.target.value)}
        label={'Response body'}
        variant={'standard'}
        size={'small'}
        placeholder={'{"id": 1}'}
        className={'mt-2'}
      />
    </React.Fragment>
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
)(RequestsSideBodyFilters);
