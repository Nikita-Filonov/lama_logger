import React from "react";
import {Bar} from "react-chartjs-2";
import {Paper} from "@mui/material";
import {useCommonChartOptions} from "../../../../Utils/Hooks/ChartsHooks";
import {useRequestsStats} from "../../../../Providers/Requests/RequestsStatsProvider";
import ChartGroupByMenu from "./ChartGroupByMenu";

export const CommonStatsChart = () => {
  const {commonChartOptions} = useCommonChartOptions();
  const {requestsStats} = useRequestsStats();

  return (
    <Paper>
      <Bar data={requestsStats?.data} options={commonChartOptions}/>
      <ChartGroupByMenu chart={'commonStatsChart'}/>
    </Paper>
  )
}
