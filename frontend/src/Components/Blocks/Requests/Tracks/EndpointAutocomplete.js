import React, {useMemo, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {connect} from "react-redux";
import {validateHttp} from "../../../../Utils/Utils/Validators";

const EndpointAutocomplete = ({endpoint, setEndpoint, projectSettings}) => {
  const [fakeEndpoint, setFakeEndpoint] = useState('');

  const domains = useMemo(() => projectSettings?.trackDomains?.map(p => p.domain), [projectSettings]);
  const patterns = useMemo(() => projectSettings?.trackPatterns?.map(p => p.pattern), [projectSettings]);

  const filterOptions = (options, {inputValue}) => validateHttp(inputValue) ? patterns : domains;

  const onInputChange = (event) => {
    const value = event.target.value;
    setEndpoint(value)

    if (value === '') {
      setFakeEndpoint('')
    }
  }

  const onAutocompleteChange = (_, inputValue) => setEndpoint(endpoint + inputValue);

  return (
    <Autocomplete
      value={fakeEndpoint}
      inputValue={endpoint}
      size={'small'}
      freeSolo
      options={patterns}
      onChange={onAutocompleteChange}
      disableCloseOnSelect
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          className={'mt-3'}
          label={'Endpoint'}
          placeholder={'https://some.unstable.endpoint.com/api/v1/'}
          size={'small'}
          variant={'standard'}
          onChange={onInputChange}
        />
      )}
    />
  )
}

const getState = (state) => ({
  projectSettings: state.projects.projectSettings
})

export default connect(
  getState,
  null,
)(EndpointAutocomplete);
