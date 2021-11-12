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
import {setStatsFilters} from "../../../../Redux/Requests/Stats/statsActions";


const StatsTimeFilters = ({modal, setModal, statsFilters, setStatsFilters}) => {
  const [range, setRange] = useState([
    statsFilters?.time?.range[0],
    statsFilters?.time?.range[1]
  ]);

  const onClose = () => setModal(false);
  const onSelectTime = (index, time) => {
    const safeRange = [...range];
    safeRange[index] = time;
    setRange([...safeRange]);
  }

  const applyFilter = () => {
    onClose();
    setStatsFilters({...statsFilters, time: {range, type: 'range'}})
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
  statsFilters: state.stats.statsFilters,
})

export default connect(
  getState,
  {
    setStatsFilters,
  },
)(StatsTimeFilters);
