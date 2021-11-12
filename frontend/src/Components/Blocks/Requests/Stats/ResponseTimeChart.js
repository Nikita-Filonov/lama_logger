import React from "react";
import {Paper} from "@mui/material";
import {Line} from 'react-chartjs-2';
import ChartGroupByMenu from "./ChartGroupByMenu";

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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
  return (
    <Paper>
      <Line data={data} options={options}/>
      <ChartGroupByMenu/>
    </Paper>
  )
}
