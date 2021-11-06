import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../../Redux/Requests/Requests/requestsActions";
import {TextField, Typography} from "@mui/material";

const RequestsSideDomainFilters = ({requestsFilters, setRequestsFilters}) => {
  const [domain, setDomain] = useState(requestsFilters?.domain);

  useEffect(() => {
    const timeoutSearch = setTimeout(async () =>
      setRequestsFilters({...requestsFilters, domain}), 700)
    return () => clearTimeout(timeoutSearch);
  }, [domain]);

  return (
    <React.Fragment>
      <Typography variant={'subtitle2'} className={'mt-2'}>Url</Typography>
      <TextField
        value={domain || ''}
        onChange={event => setDomain(event.target.value)}
        label={'Domain or url'}
        variant={'standard'}
        size={'small'}
        placeholder={'some.domain.com'}
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
)(RequestsSideDomainFilters);
