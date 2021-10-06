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

const styles = theme => ({
  root: {
    display: "flex",
    textAlign: "center",
    width: 300,
    marginLeft: 100,
    marginTop: 200
  },
  hidden: {
    display: "none"
  },
  button: {
    background: "green"
  },
  label: {
    backgroundColor: "white"
  }
});

const TimeFilters = ({requestsTimeFilterModal, setRequestsTimeFilterModal}) => {
  const onClose = () => setRequestsTimeFilterModal(false)

  return (
    <Dialog open={requestsTimeFilterModal} onClose={onClose}>
      <DialogTitle>Time filters</DialogTitle>
      <DialogContent>
        <div className={'w-100 d-flex'}>
          <FormControl variant="standard" sx={{marginRight: 3, minWidth: 120}}>
            <InputLabel id="demo-simple-select-standard-label">Next/Prev</InputLabel>
            <Select label="Age">
              <MenuItem value={10}>Prev</MenuItem>
              <MenuItem value={20}>Next</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type={'number'}
            fullWidth
            variant={'standard'}
            label={'Amount'}
          />
          <FormControl variant="standard" sx={{marginLeft: 3, minWidth: 120}}>
            <InputLabel id="demo-simple-select-standard-label">Period</InputLabel>
            <Select label="Age">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Second</MenuItem>
              <MenuItem value={20}>Minutes</MenuItem>
              <MenuItem value={30}>Hours</MenuItem>
              <MenuItem value={30}>Days</MenuItem>
              <MenuItem value={30}>Month</MenuItem>
            </Select>
          </FormControl>
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
