import React from "react";
import {Paper, Typography} from "@mui/material";
import {Line} from 'react-chartjs-2';
import ChartGroupByMenu from "../Tools/ChartGroupByMenu";
import {useLineChartOptions} from "../../../../../Utils/Hooks/ChartsHooks";
import {connect} from "react-redux";

const RatioStatusCodesChart = ({ratioStatusCodes, statsGroupBy}) => {
  const {lineChartOptions} = useLineChartOptions();

  return (
    <Paper>
      <Typography sx={{ml: 1.5, pt: 0.5}} variant={'subtitle2'}>
        Number of errors per {statsGroupBy?.ratioStatusCodes?.slice(0, -1)}
      </Typography>
      <Line data={ratioStatusCodes} options={lineChartOptions}/>
      <ChartGroupByMenu chart={'ratioStatusCodes'}/>
    </Paper>
  )
}

const getState = (state) => ({
  statsGroupBy: state.stats.statsGroupBy,
  ratioStatusCodes: state.stats.ratioStatusCodes
})

export default connect(
  getState,
  null,
)(RatioStatusCodesChart);
