import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {connect} from "react-redux";
import {setRequestsTimeFilterModal} from "../../../../Redux/Requests/requestsActions";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {ButtonGroup, Link, Typography} from "@mui/material";


const TimeFilters = ({requestsTimeFilterModal, setRequestsTimeFilterModal}) => {
  const onClose = () => setRequestsTimeFilterModal(false)

  return (
    <Dialog open={requestsTimeFilterModal} onClose={onClose}>
      <DialogTitle>Time filters</DialogTitle>
      <DialogContent>
        <div className={'w-100 d-flex'}>
          <FormControl variant="standard" sx={{marginRight: 3, minWidth: 120}}>
            <InputLabel>Next/Prev</InputLabel>
            <Select label="Age" defaultValue={10}>
              <MenuItem value={10}>Prev</MenuItem>
              <MenuItem value={20}>Next</MenuItem>
            </Select>
          </FormControl>
          <TextField
            defaultValue={5}
            type={'number'}
            fullWidth
            variant={'standard'}
            label={'Amount'}
          />
          <FormControl variant="standard" sx={{marginLeft: 3, minWidth: 120}}>
            <InputLabel id="demo-simple-select-standard-label">Period</InputLabel>
            <Select label="Age" defaultValue={20}>
              <MenuItem value={10}>Seconds</MenuItem>
              <MenuItem value={20}>Minutes</MenuItem>
              <MenuItem value={30}>Hours</MenuItem>
              <MenuItem value={30}>Days</MenuItem>
              <MenuItem value={30}>Months</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography variant={'subtitle1'} className={'mt-3'}>Commonly used</Typography>
          <ButtonGroup variant="text" size={'small'} orientation={'vertical'}>
            <Button className={'justify-content-start'}>Today</Button>
            <Button className={'justify-content-start'}>This week</Button>
            <Button className={'justify-content-start'}>Last 15 minutes</Button>
            <Button className={'justify-content-start'}>Last 30 minutes</Button>
            <Button className={'justify-content-start'}>Last 1 hour</Button>
          </ButtonGroup>
          <ButtonGroup variant="text" size={'small'} orientation={'vertical'} className={'ms-5'}>
            <Button className={'justify-content-start'}>Last 24 hours</Button>
            <Button className={'justify-content-start'}>Last 7 days</Button>
            <Button className={'justify-content-start'}>Last 15 minutes</Button>
            <Button className={'justify-content-start'}>Last 30 minutes</Button>
            <Button className={'justify-content-start'}>Last 1 hour</Button>
          </ButtonGroup>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}


const getState = (state) => ({
  requestsTimeFilterModal: state.requests.requestsTimeFilterModal,
})

export default connect(
  getState,
  {
    setRequestsTimeFilterModal
  },
)(TimeFilters);
