import React from "react";
import {alpha, InputAdornment, InputBase} from "@mui/material";
import {Close, Search as SearchIcon} from "@mui/icons-material";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";

const SearchInput = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export const Search = ({search, setSearch, placeholder}) => {
  const onClear = () => setSearch('')

  return (
    <SearchInput style={{marginRight: 20}}>
      <SearchIconWrapper>
        <SearchIcon/>
      </SearchIconWrapper>
      <StyledInputBase
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder={placeholder}
        endAdornment={search?.length > 0 ?
          <InputAdornment position={'end'}>
            <IconButton onClick={onClear}>
              <Close fontSize={'small'}/>
            </IconButton>
          </InputAdornment> : null
        }
      />
    </SearchInput>
  )
}
