import React, {useMemo, useState} from "react";
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
import {Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Typography} from "@mui/material";
import {UNITS} from "../../../../Utils/Constants";
import Box from "@mui/material/Box";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {DesktopDateRangePicker, TimePicker} from "@mui/lab";
import moment from "moment";


const TimeFilters = (props) => {
  const {requestsTimeFilterModal, setRequestsTimeFilterModal, requestsFilters, setRequestsFilters} = props;
  const [prev, setPrev] = useState(requestsFilters?.time?.interval?.prev);
  const [amount, setAmount] = useState(requestsFilters?.time?.interval?.amount);
  const [unit, setUnit] = useState(requestsFilters?.time?.interval?.unit);
  const [range, setRange] = useState([requestsFilters?.time?.range?.start, requestsFilters?.time?.range?.end]);
  const [type, setType] = useState(requestsFilters?.time?.type);

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
            <div className={'w-100 d-flex mt-3'}>
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
            <div className={'mt-3'}>
              <DesktopDateRangePicker
                startText={'Date from'}
                endText={'Date to'}
                value={range}
                onChange={(newValue) => setRange(newValue)}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} variant={'standard'} fullWidth size={'small'}/>
                    <Box sx={{mx: 2}}> to </Box>
                    <TextField {...endProps} variant={'standard'} fullWidth size={'small'}/>
                  </React.Fragment>
                )}
              />
              <div className={'d-flex justify-content-center align-items-center mt-2'}>
                <TimePicker
                  ampm={false}
                  label="Time from"
                  value={range[0]}
                  onChange={(newValue) => onSelectTime(0, newValue)}
                  renderInput={(params) =>
                    <TextField {...params} variant={'standard'} fullWidth size={'small'}/>
                  }
                />
                <Box sx={{mx: 2, mt: 1}}> to </Box>
                <TimePicker
                  ampm={false}
                  label="Time to"
                  value={range[1]}
                  onChange={(newValue) => onSelectTime(1, newValue)}
                  renderInput={(params) =>
                    <TextField {...params} variant={'standard'} fullWidth size={'small'}/>
                  }
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <div>
          <Typography variant={'subtitle1'} className={'mt-3'}>Commonly used</Typography>
          <ButtonGroup variant="text" size={'small'} orientation={'vertical'}>
            <Button
              className={'justify-content-start'}
              onClick={() => onSelectCommonRange('day')}
            >
              Today
            </Button>
            <Button
              className={'justify-content-start'}
              onClick={() => onSelectCommonRange('week')}
            >
              This week
            </Button>
            <Button
              className={'justify-content-start'}
              onClick={() => onSelectCommonLast(15, 'minutes')}>
              Last 15 minutes
            </Button>
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
