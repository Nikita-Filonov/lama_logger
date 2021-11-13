import React from "react";
import {Paper} from "@mui/material";
import {Line} from 'react-chartjs-2';
import ChartGroupByMenu from "./ChartGroupByMenu";
import {useCommonChartOptions} from "../../../../Utils/Hooks/ChartsHooks";

const data = {
  labels: [
    "Oct 30, 21:00",
    "Oct 31, 09:00",
    "Oct 31, 10:00",
    "Nov 01, 17:00",
    "Nov 04, 10:00",
    "Nov 11, 20:00",
    "Nov 12, 20:00"
  ],
  datasets: [
    {
      label: 'Quantity 5XX by days',
      data: [
        60,
        100,
        30,
        2,
        100,
        80,
        1
      ],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export const ResponseTimeChart = () => {
  const {commonChartOptions} = useCommonChartOptions();

  return (
    <Paper>
      <Line data={data} options={commonChartOptions}/>
      <ChartGroupByMenu/>
    </Paper>
  )
}
