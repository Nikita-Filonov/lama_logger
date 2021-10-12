import React from "react";
import {DesktopDateRangePicker, TimePicker} from "@mui/lab";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


export const RangeFilters = ({range, setRange, onSelectTime}) => {
  return (
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
  )
}
