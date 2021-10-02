import * as React from 'react';
import {useState} from 'react';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Circle} from "@mui/icons-material";
import {setRequestsFilters} from "../../../Redux/Requests/requestsActions";
import {connect} from "react-redux";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const RequestsFilters = ({requestsFilters, setRequestsFilters}) => {
  const [methods, setMethods] = useState(requestsFilters.methods);
  const [successes, setSuccesses] = useState(requestsFilters.successes);

  const onSuccess = (event, newsSuccesses) => {
    setSuccesses(newsSuccesses);
    setRequestsFilters({...requestsFilters, successes: newsSuccesses})
    localStorage.setItem('successes', JSON.stringify(newsSuccesses))
  };

  const onMethod = (event, newMethods) => {
    setMethods(newMethods)
    setRequestsFilters({...requestsFilters, methods: newMethods})
    localStorage.setItem('methods', JSON.stringify(newMethods))
  }

  return (
    <div className={'ms-5'}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={methods}
          onChange={onMethod}
          aria-label="text alignment"
        >
          <ToggleButton value="GET" aria-label="left aligned" title={'GET'}>
            GET
          </ToggleButton>
          <ToggleButton value="POST" aria-label="centered">
            POST
          </ToggleButton>
          <ToggleButton value="PUT" aria-label="right aligned">
            PUT
          </ToggleButton>
          <ToggleButton value="PATCH" aria-label="justified">
            PATCH
          </ToggleButton>
          <ToggleButton value="DELETE" aria-label="justified">
            DELETE
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{mx: 0.5, my: 1,}}/>
        <StyledToggleButtonGroup
          size="small"
          value={successes}
          onChange={onSuccess}
          aria-label="text formatting"
        >
          <ToggleButton value="success" aria-label="bold" style={{alignItems: 'center', justifyContent: 'center'}}>
            <Circle style={{color: '#02C001'}} fontSize={'small'}/>
          </ToggleButton>
          <ToggleButton value="redirect" aria-label="italic">
            <Circle style={{color: '#FFBD00'}} fontSize={'small'}/>
          </ToggleButton>
          <ToggleButton value="error" aria-label="underlined">
            <Circle style={{color: '#E40F08'}} fontSize={'small'}/>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}

const getState = (state) => ({
  requestsFilters: state.requests.requestsFilters
})

export default connect(
  getState,
  {
    setRequestsFilters
  },
)(RequestsFilters);
