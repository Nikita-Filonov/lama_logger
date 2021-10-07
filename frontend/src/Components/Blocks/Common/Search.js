import React from "react";
import {TextField} from "@mui/material";
import {InputAdornment} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import {Close} from "@material-ui/icons";

export const Search = ({search, setSearch, placeholder, label}) => {
  const onClear = () => setSearch('')

  return (
    <TextField
      value={search}
      size={'small'}
      id="outlined-uncontrolled"
      label={label}
      placeholder={placeholder}
      onChange={event => setSearch(event.target.value)}
      variant={'standard'}
      className={'mb-2 me-5 w-25'}
      InputProps={{
        endAdornment: search.length > 0 ? (
          <InputAdornment position={'end'}>
            <IconButton onClick={onClear}>
              <Close fontSize={'small'}/>
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  )
}
