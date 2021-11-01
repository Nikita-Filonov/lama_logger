import React, {useEffect, useMemo, useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {connect} from "react-redux";
import {setRequestsFilters, setRequestsTimeFilterModal} from "../../../../../Redux/Requests/Requests/requestsActions";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from "moment";
import {CommonlyUsed} from "../../../../Blocks/Requests/Requests/RequestsFilters/TimeFilters/CommonlyUsed";
import {IntervalFilters} from "../../../../Blocks/Requests/Requests/RequestsFilters/TimeFilters/IntervalFilters";
import {RangeFilters} from "../../../../Blocks/Requests/Requests/RequestsFilters/TimeFilters/RangeFilters";


const TimeFilters = (props) => {
  const {requestsTimeFilterModal, setRequestsTimeFilterModal, requestsFilters, setRequestsFilters} = props;
  const [prev, setPrev] = useState(requestsFilters?.time?.interval?.prev);
  const [amount, setAmount] = useState(requestsFilters?.time?.interval?.amount);
  const [unit, setUnit] = useState(requestsFilters?.time?.interval?.unit);
  const [range, setRange] = useState([requestsFilters?.time?.range?.start, requestsFilters?.time?.range?.end]);
  const [type, setType] = useState(requestsFilters?.time?.type);

  useEffect(() => {
    setPrev(requestsFilters?.time?.interval?.prev);
    setAmount(requestsFilters?.time?.interval?.amount);
    setUnit(requestsFilters?.time?.interval?.unit);
    setRange([requestsFilters?.time?.range?.start, requestsFilters?.time?.range?.end]);
    setType(requestsFilters?.time?.type);
  }, [requestsFilters])

  const isRangeValid = useMemo(() => type === 'range' ? range.every(r => r !== null) : true, [type, range])
  const onClose = () => setRequestsTimeFilterModal(false);
  const onSelectTime = (index, time) => {
    const safeRange = [...range];
    safeRange[index] = time;
    setRange([...safeRange]);
  }
  const onSelectCommonLast = (amount, unit) => {
    setType('interval');
    setAmount(amount);
    setUnit(unit);
    setPrev('prev')
  }
  const onSelectCommonRange = (type) => {
    setType('range')
    const now = moment(new Date());
    setRange([now.startOf(type).toDate(), new Date()]);
  }

  const applyFilter = () => {
    setRequestsFilters({...requestsFilters, time: {type, range, interval: {prev, amount, unit}}})
    onClose();
  }

  return (
    <Dialog open={requestsTimeFilterModal} onClose={onClose}>
      <DialogTitle>Time filters</DialogTitle>
      <DialogContent>
        <Accordion expanded={type === 'interval'} onChange={() => setType('interval')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{width: '33%', flexShrink: 0}}>
              Custom interval
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <IntervalFilters
              unit={unit}
              setUnit={setUnit}
              amount={amount}
              setAmount={setAmount}
              prev={prev}
              setPrev={setPrev}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={type === 'range'} onChange={() => setType('range')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{width: '33%', flexShrink: 0}}>Custom range</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RangeFilters range={range} setRange={setRange} onSelectTime={onSelectTime}/>
          </AccordionDetails>
        </Accordion>

        <CommonlyUsed onSelectCommonLast={onSelectCommonLast} onSelectCommonRange={onSelectCommonRange}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={applyFilter} disabled={!isRangeValid}>Apply</Button>
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
