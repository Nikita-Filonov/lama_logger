import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {UNITS} from "../../../../../Utils/Constants";

export const IntervalFilters = ({prev, setPrev, amount, setAmount, unit, setUnit}) => {
  return (
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
  )
}
