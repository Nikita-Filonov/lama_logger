import React from "react";
import {Paper, Typography} from "@mui/material";
import {Line} from 'react-chartjs-2';
import ChartGroupByMenu from "../Tools/ChartGroupByMenu";
import {useLineChartOptions} from "../../../../../Utils/Hooks/ChartsHooks";
import {connect} from "react-redux";

const ResponseTimeChart = ({responseTime, statsGroupBy}) => {
  const {lineChartOptions} = useLineChartOptions();

  return (
    <Paper>
      <Typography sx={{ml: 1.5, pt: 0.5}} variant={'subtitle2'}>
        Average response time per {statsGroupBy?.responseTime?.slice(0, -1)} (in milliseconds)
      </Typography>
      <Line data={responseTime} options={lineChartOptions}/>
      <ChartGroupByMenu chart={'responseTime'}/>
    </Paper>
  )
}

const getState = (state) => ({
  statsGroupBy: state.stats.statsGroupBy,
  responseTime: state.stats.responseTime
})

export default connect(
  getState,
  null,
)(ResponseTimeChart);
