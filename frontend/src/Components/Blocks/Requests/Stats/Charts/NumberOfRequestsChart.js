import React from "react";
import {Bar} from "react-chartjs-2";
import {Paper, Typography} from "@mui/material";
import {useCommonChartOptions} from "../../../../../Utils/Hooks/ChartsHooks";
import ChartGroupByMenu from "../Tools/ChartGroupByMenu";
import {connect} from "react-redux";

const NumberOfRequestsChart = ({numberOfRequests, statsGroupBy}) => {
  const {commonChartOptions} = useCommonChartOptions();

  return (
    <Paper>
      <Typography sx={{ml: 1.5, pt: 0.5}} variant={'subtitle2'}>
        Number of requests per {statsGroupBy?.numberOfRequests?.slice(0, -1)}
      </Typography>
      <Bar data={numberOfRequests} options={commonChartOptions}/>
      <ChartGroupByMenu chart={'numberOfRequests'}/>
    </Paper>
  )
}

const getState = (state) => ({
  statsGroupBy: state.stats.statsGroupBy,
  numberOfRequests: state.stats.numberOfRequests
})

export default connect(
  getState,
  null,
)(NumberOfRequestsChart);
