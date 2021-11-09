import React from "react";
import {Checkbox, IconButton, TextField} from "@mui/material";
import {Close} from "@mui/icons-material";
import {Autocomplete} from "@mui/lab";
import {connect} from "react-redux";


const HeadersFields = ({header, index, onPasteHeaders, onRemove, onChange, userSettings}) => {
  const {key, value, include} = header;
  const {keys, values, disableAutocomplete} = userSettings?.customRequestsHeaders;

  return (
    <div className={'d-flex align-items-center'} key={index}>
      <Checkbox
        size={'small'}
        checked={include}
        onClick={async event => await onChange(event.target.checked, index, 'include')}
      />
      <Autocomplete
        freeSolo
        fullWidth
        sx={{mr: 2}}
        value={key}
        options={disableAutocomplete ? [] : keys}
        onChange={async (_, value) => await onChange(value, index, 'key')}
        onSelect={async (event, _) => await onChange(event.target.value, index, 'key')}
        onPaste={async event => await onPasteHeaders(event, index, 'key')}
        renderInput={(params) =>
          <TextField {...params} variant={'standard'} size={'small'} placeholder={'Key'}/>
        }
      />
      <Autocomplete
        freeSolo
        fullWidth
        value={value}
        options={disableAutocomplete ? [] : values}
        onChange={async (_, value) => await onChange(value, index, 'value')}
        onSelect={async (event, _) => await onChange(event.target.value, index, 'value')}
        onPaste={async event => await onPasteHeaders(event, index, 'value')}
        renderInput={(params) =>
          <TextField {...params} variant={'standard'} size={'small'} placeholder={'Value'}/>
        }
      />
      <IconButton size={'small'} sx={{mr: 1}} onClick={async () => await onRemove(index)}>
        <Close fontSize={'small'}/>
      </IconButton>
    </div>
  )
};


const getState = (state) => ({
  userSettings: state.users.userSettings,
})

export default connect(
  getState,
  null,
)(HeadersFields);
