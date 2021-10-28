import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../../../Redux/Requests/Requests/requestsActions";
import {TextField} from "@mui/material";

const RequestsSideDomainFilters = ({requestsFilters, setRequestsFilters}) => {
  const [domain, setDomain] = useState(requestsFilters?.domain);
  const [headers, setHeaders] = useState(requestsFilters?.headers);
  const [requestBody, setRequestBody] = useState(requestsFilters?.body);
  const [responseBody, setResponseBody] = useState(requestsFilters?.body);

  useEffect(() => {
    const timeoutSearch = setTimeout(async () =>
      setRequestsFilters({...requestsFilters, domain, headers, body: {responseBody, requestBody}}), 700)
    return () => clearTimeout(timeoutSearch);
  }, [domain, headers, requestBody, responseBody]);

  return (
    <React.Fragment>
      <TextField
        value={domain}
        onChange={event => setDomain(event.target.value)}
        label={'Domain or url'}
        variant={'standard'}
        size={'small'}
        placeholder={'some.domain.com'}
        className={'mt-2'}
      />
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
      {/*<TextField*/}
      {/*  value={headers}*/}
      {/*  onChange={event => setHeaders(event.target.value)}*/}
      {/*  label={'Headers'}*/}
      {/*  variant={'standard'}*/}
      {/*  size={'small'}*/}
      {/*  placeholder={'application/json'}*/}
      {/*  className={'mt-2'}*/}
      {/*/>*/}
    </React.Fragment>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  requestsFilters: state.requests.requestsFilters,
})

export default connect(
  getState,
  {
    setRequestsFilters,
  },
)(RequestsSideDomainFilters);
