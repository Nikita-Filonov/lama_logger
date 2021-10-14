import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {RangeFilters} from "../../../Blocks/Requests/Requests/RequestsFilters/TimeFilters/RangeFilters";
import {DialogContentText} from "@mui/material";


export const StatsTimeFilters = ({modal, setModal}) => {
  const [range, setRange] = useState([null, null]);

  const onClose = () => setModal(false);
  const onSelectTime = (index, time) => {
    const safeRange = [...range];
    safeRange[index] = time;
    setRange([...safeRange]);
  }

  const applyFilter = () => {
    onClose();
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
