import React, {useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {connect} from "react-redux";

const EndpointAutocomplete = ({endpoint, setEndpoint, projectSettings}) => {
  const [fakeEndpoint, setFakeEndpoint] = useState('');


  const filterOptions = (options, {inputValue}) => {
    if (inputValue?.startsWith('http')) {
      return options;
    }

    return ['https://some.unstable.endpoint.com/api/v1/', 'http://localhost:8000'];
  }

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
      options={projectSettings?.trackPatterns?.map(p => p.pattern)}
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
