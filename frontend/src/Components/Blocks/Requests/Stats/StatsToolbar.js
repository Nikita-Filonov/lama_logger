import React from "react";
import clsx from "clsx";
import {Divider, IconButton, Paper, Typography} from "@mui/material";
import {common, RequestsToolbarStyles, ViewRequestStyles} from "../../../../Styles/Blocks";
import Button from "@mui/material/Button";
import {AccessTime, Circle, HelpOutline} from "@mui/icons-material";
import ProjectSelect from "../Requests/Toolbars/ProjectSelect";

export const StatsToolbar = () => {
  const classes = ViewRequestStyles();

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex', classes.toolbarContainer)}
    >
      <ProjectSelect/>
      <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
      <Button startIcon={<AccessTime/>} color={'inherit'} style={RequestsToolbarStyles.timeFiltersButton}>
        <Typography style={common.ellipsisText}>Time filters</Typography>
      </Button>
      <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
      <Button startIcon={<Circle sx={{color: '#02C001'}}/>} color={'inherit'}
              style={RequestsToolbarStyles.timeFiltersButton}>
        <Typography style={common.ellipsisText}>Successes</Typography>
      </Button>
      <div className={'flex-grow-1'}/>
      <IconButton>
        <HelpOutline/>
      </IconButton>
    </Paper>
  )
}
