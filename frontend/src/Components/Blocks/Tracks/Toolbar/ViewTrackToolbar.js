import React, {useState} from "react";
import clsx from "clsx";
import {Paper} from "@mui/material";
import {ViewRequestStyles} from "../../../../Styles/Blocks";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";

export const ViewTrackToolbar = () => {
  const classes = ViewRequestStyles();
  const [alignment, setAlignment] = useState('web');

  const handleChange = (event, newAlignment) => setAlignment(newAlignment);

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex', classes.toolbarContainer)}
    >
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="web">Web</ToggleButton>
        <ToggleButton value="android">Android</ToggleButton>
        <ToggleButton value="ios">iOS</ToggleButton>
      </ToggleButtonGroup>
      <div className={'flex-grow-1'}/>
    </Paper>
  )
}
