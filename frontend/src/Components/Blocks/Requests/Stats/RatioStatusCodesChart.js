import React, {useEffect} from "react";
import {Paper} from "@mui/material";
import {Line} from 'react-chartjs-2';
import ChartGroupByMenu from "./ChartGroupByMenu";
import {useCommonChartOptions} from "../../../../Utils/Hooks/ChartsHooks";
import {connect} from "react-redux";

const RatioStatusCodesChart = ({ratioStatusCodes}) => {
  const {commonChartOptions} = useCommonChartOptions();

  useEffect(() => console.log(ratioStatusCodes), [ratioStatusCodes])

  return (
    <Paper>
      <Line data={ratioStatusCodes} options={commonChartOptions}/>
      <ChartGroupByMenu chart={'ratioStatusCodes'}/>
    </Paper>
  )
}

const getState = (state) => ({
  ratioStatusCodes: state.stats.ratioStatusCodes
})

export default connect(
  getState,
  null,
)(RatioStatusCodesChart);
