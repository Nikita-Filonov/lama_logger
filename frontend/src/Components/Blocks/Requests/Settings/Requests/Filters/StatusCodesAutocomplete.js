import React from "react";
import {REQUESTS_STATUS_CODES_TYPES} from "../../../../../../Utils/Constants";
import {Autocomplete, Checkbox, InputAdornment, TextField} from "@mui/material";
import {StatusCodeIndicator} from "../../../Requests/StatusCodeIndicator";


export const StatusCodesAutocomplete = ({load, type = 'success', value, options, onChange}) => {
  return (
    <Autocomplete
      value={value}
      size={'small'}
      key={load}
      multiple
      freeSolo
      className={'w-50'}
      options={options}
      onChange={(_, value) => onChange(type, value)}
      disableCloseOnSelect
      getOptionLabel={(option) => option.toString()}
      renderOption={(props, option, {selected}) => (
        <li {...props}>
          <Checkbox size={'small'} style={{marginRight: 8}} checked={selected}/>
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`Status codes "${type}"`}
          placeholder="Select from list or type custom"
          size={'small'}
          variant={'standard'}
          helperText={`Select "${type}" status codes which you want 
                to see in requests filters section`}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <React.Fragment>
                <InputAdornment position="start">
                  <StatusCodeIndicator statusCode={REQUESTS_STATUS_CODES_TYPES.find(t => t.value === type).code}/>
                </InputAdornment>
                {params.InputProps.startAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
