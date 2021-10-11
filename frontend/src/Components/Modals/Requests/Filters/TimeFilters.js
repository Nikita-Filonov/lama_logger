import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {connect} from "react-redux";
import {setRequestsFilters, setRequestsTimeFilterModal} from "../../../../Redux/Requests/requestsActions";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {ButtonGroup, Typography} from "@mui/material";
import {UNITS} from "../../../../Utils/Constants";


const TimeFilters = (props) => {
  const {requestsTimeFilterModal, setRequestsTimeFilterModal, requestsFilters, setRequestsFilters} = props;
  const [prev, setPrev] = useState(requestsFilters?.interval?.prev);
  const [amount, setAmount] = useState(requestsFilters?.interval?.amount);
  const [unit, setUnit] = useState(requestsFilters?.interval?.unit);

  const onClose = () => setRequestsTimeFilterModal(false);

  const applyFilter = () => {
    setRequestsFilters({...requestsFilters, interval: {amount, unit, prev}})
    onClose();
  }

  return (
    <Dialog open={requestsTimeFilterModal} onClose={onClose}>
      <DialogTitle>Time filters</DialogTitle>
      <DialogContent>
        <div className={'w-100 d-flex'}>
          <FormControl variant="standard" sx={{marginRight: 3, minWidth: 120}}>
            <InputLabel>Next/Prev</InputLabel>
            <Select value={prev} onChange={event => setPrev(event.target.value)}>
              <MenuItem value={'prev'}>Prev</MenuItem>
              <MenuItem value={'next'}>Next</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={amount}
            onChange={event => setAmount(parseInt(event.target.value))}
            type={'number'}
            fullWidth
            variant={'standard'}
            label={'Amount'}
          />
          <FormControl variant="standard" sx={{marginLeft: 3, minWidth: 120}}>
            <InputLabel id="demo-simple-select-standard-label">Period</InputLabel>
            <Select value={unit} onChange={event => setUnit(event.target.value)}>
              {UNITS.map(int =>
                <MenuItem key={int.unit} value={int.unit}>{int.label}</MenuItem>
              )}
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
        <Button onClick={applyFilter}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}


const getState = (state) => ({
  requestsFilters: state.requests.requestsFilters,
  requestsTimeFilterModal: state.requests.requestsTimeFilterModal,
})

export default connect(
  getState,
  {
    setRequestsFilters,
    setRequestsTimeFilterModal,
  },
)(TimeFilters);
