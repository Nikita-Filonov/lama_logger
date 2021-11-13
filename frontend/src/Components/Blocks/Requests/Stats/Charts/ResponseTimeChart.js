import React from "react";
import {Paper, Typography} from "@mui/material";
import {Line} from 'react-chartjs-2';
import ChartGroupByMenu from "../Tools/ChartGroupByMenu";
import {useCommonChartOptions} from "../../../../../Utils/Hooks/ChartsHooks";
import {connect} from "react-redux";

const ResponseTimeChart = ({responseTime, statsGroupBy}) => {
  const {commonChartOptions} = useCommonChartOptions();

  return (
    <Paper>
      <Typography sx={{ml: 1.5, pt: 0.5}} variant={'subtitle2'}>
        Average response time per {statsGroupBy?.responseTime?.slice(0, -1)} (in milliseconds)
      </Typography>
      <Line data={responseTime} options={commonChartOptions}/>
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
