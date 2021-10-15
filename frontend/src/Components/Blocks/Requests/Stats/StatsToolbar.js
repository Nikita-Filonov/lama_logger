import React, {useState} from "react";
import clsx from "clsx";
import {Divider, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import {common, RequestsToolbarStyles, ViewRequestStyles} from "../../../../Styles/Blocks";
import Button from "@mui/material/Button";
import {AccessTime, Clear, HelpOutline} from "@mui/icons-material";
import ProjectSelect from "../Requests/Toolbars/ProjectSelect";
import StatsTimeFilters from "../../../Modals/Requests/Stats/StatsTimeFilters";
import {connect} from "react-redux";
import {setRequestsStatsFilters} from "../../../../Redux/Requests/Requests/requestsActions";
import {getTimeFiltersLabel} from "../../../../Utils/Untils/Formatters";

const StatsToolbar = ({requestsStatsFilters, setRequestsStatsFilters}) => {
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
          onClick={() => setTimeFiltersModal(true)}
        >
          <Typography style={common.ellipsisText}>{getTimeFiltersLabel(requestsStatsFilters?.time)}</Typography>
        </Button>
        <div className={'flex-grow-1'}/>
        <Tooltip title={'Clear all filters'}>
          <IconButton sx={{mr: 2}} onClick={() => setRequestsStatsFilters({})}>
            <Clear/>
          </IconButton>
        </Tooltip>
        <IconButton>
          <HelpOutline/>
        </IconButton>
      </Paper>
      <StatsTimeFilters modal={timeFiltersModal} setModal={setTimeFiltersModal}/>
    </React.Fragment>
  )
}

const getState = (state) => ({
  requestsStatsFilters: state.requests.requestsStatsFilters,
})

export default connect(
  getState,
  {
    setRequestsStatsFilters,
  },
)(StatsToolbar);
