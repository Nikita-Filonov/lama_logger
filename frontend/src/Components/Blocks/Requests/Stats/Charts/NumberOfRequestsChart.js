import React from "react";
import {Bar} from "react-chartjs-2";
import {Paper} from "@mui/material";
import {useCommonChartOptions} from "../../../../../Utils/Hooks/ChartsHooks";
import ChartGroupByMenu from "../Tools/ChartGroupByMenu";
import {connect} from "react-redux";

const NumberOfRequestsChart = ({numberOfRequests}) => {
  const {commonChartOptions} = useCommonChartOptions();

  return (
    <Paper>
      <Bar data={numberOfRequests} options={commonChartOptions}/>
      <ChartGroupByMenu chart={'numberOfRequests'}/>
    </Paper>
  )
}

const getState = (state) => ({
  numberOfRequests: state.stats.numberOfRequests
})

export default connect(
  getState,
  null,
)(NumberOfRequestsChart);
