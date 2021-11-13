import React from "react";
import {Paper, Typography} from "@mui/material";
import {Line} from 'react-chartjs-2';
import ChartGroupByMenu from "../Tools/ChartGroupByMenu";
import {useCommonChartOptions} from "../../../../../Utils/Hooks/ChartsHooks";
import {connect} from "react-redux";

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

const ResponseTimeChart = ({statsGroupBy}) => {
  const {commonChartOptions} = useCommonChartOptions();

  return (
    <Paper>
      <Typography sx={{ml: 1.5, pt: 0.5}} variant={'subtitle2'}>
        Average response time per {statsGroupBy?.numberOfRequests?.slice(0, -1)}
      </Typography>
      <Line data={data} options={commonChartOptions}/>
      <ChartGroupByMenu/>
    </Paper>
  )
}

const getState = (state) => ({
  statsGroupBy: state.stats.statsGroupBy,
})

export default connect(
  getState,
  null,
)(ResponseTimeChart);
