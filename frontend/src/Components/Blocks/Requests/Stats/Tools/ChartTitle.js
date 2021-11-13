import React from "react";
import {Typography} from "@mui/material";
import {connect} from "react-redux";

const ChartTitle = ({statsGroupBy, chart}) => <Typography sx={{ml: 1.5, pt: 0.5}} variant={'subtitle2'}>
  Number of requests per {statsGroupBy[chart].slice(0, -1)}
</Typography>

const getState = (state) => ({
  statsGroupBy: state.stats.statsGroupBy,
})

export default connect(
  getState,
  null,
)(ChartTitle);
