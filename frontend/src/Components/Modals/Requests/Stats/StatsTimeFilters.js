import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {RangeFilters} from "../../../Blocks/Requests/Requests/RequestsFilters/TimeFilters/RangeFilters";
import {DialogContentText} from "@mui/material";
import {connect} from "react-redux";
import {setRequestsStatsFilters} from "../../../../Redux/Requests/Requests/requestsActions";


const StatsTimeFilters = ({modal, setModal, requestsStatsFilters, setRequestsStatsFilters}) => {
  const [range, setRange] = useState([requestsStatsFilters?.time?.range[0],
    requestsStatsFilters?.time?.range[1]]);

  const onClose = () => setModal(false);
  const onSelectTime = (index, time) => {
    const safeRange = [...range];
    safeRange[index] = time;
    setRange([...safeRange]);
  }

  const applyFilter = () => {
    onClose();
    setRequestsStatsFilters({...requestsStatsFilters, time: {range, type: 'range'}})
  }

  return (
    <Dialog open={modal} onClose={onClose}>
      <DialogTitle>Stats filters</DialogTitle>
      <DialogContent>
        <DialogContentText>You can apply range to view statistic for specific period</DialogContentText>
        <RangeFilters range={range} setRange={setRange} onSelectTime={onSelectTime}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={applyFilter}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}


const getState = (state) => ({
  requestsStatsFilters: state.requests.requestsStatsFilters,
})

export default connect(
  getState,
  {
    setRequestsStatsFilters,
  },
)(StatsTimeFilters);
