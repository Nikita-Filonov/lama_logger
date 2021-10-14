import React, {useState} from "react";
import clsx from "clsx";
import {Divider, IconButton, Paper, Typography} from "@mui/material";
import {common, RequestsToolbarStyles, ViewRequestStyles} from "../../../../Styles/Blocks";
import Button from "@mui/material/Button";
import {AccessTime, Circle, HelpOutline} from "@mui/icons-material";
import ProjectSelect from "../Requests/Toolbars/ProjectSelect";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {StatsTimeFilters} from "../../../Modals/Requests/Stats/StatsTimeFilters";

export const StatsToolbar = () => {
  const classes = ViewRequestStyles();
  const [timeFiltersModal, setTimeFiltersModal] = useState(false);

  return (
    <React.Fragment>
      <Paper
        elevation={3}
        className={clsx('mt-3 d-flex', classes.toolbarContainer)}
      >
        <ProjectSelect/>
        <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
        <Button
          startIcon={<AccessTime/>}
          color={'inherit'}
          style={RequestsToolbarStyles.timeFiltersButton}
          onClick={() => setTimeFiltersModal(true)}
        >
          <Typography style={common.ellipsisText}>Time filters</Typography>
        </Button>
        <Divider orientation={'vertical'} flexItem style={RequestsToolbarStyles.buttonsDivider}/>
        <Button
          startIcon={<Circle sx={{color: '#02C001'}}/>}
          endIcon={<KeyboardArrowDownIcon/>}
          color={'inherit'}
        >
          <Typography style={common.ellipsisText}>Successes</Typography>
        </Button>
        <div className={'flex-grow-1'}/>
        <IconButton>
          <HelpOutline/>
        </IconButton>
      </Paper>
      <StatsTimeFilters modal={timeFiltersModal} setModal={setTimeFiltersModal}/>
    </React.Fragment>
  )
}
