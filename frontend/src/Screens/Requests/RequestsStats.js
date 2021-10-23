import React, {useEffect, useState} from "react";
import {Container, Grid, Paper} from "@mui/material";
import StatsToolbar from "../../Components/Blocks/Requests/Stats/StatsToolbar";
import {useRequestsStats} from "../../Providers/Requests/RequestsStatsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/Users/UsersProvider";
import {StatsInfoGrid} from "../../Components/Blocks/Requests/Stats/StatsInfoGrid";
import {makeRequestsStatsFilters} from "../../Utils/Utils/Filters";
import {Bar} from 'react-chartjs-2';

const options = {
  animation: false,
  scales: {
    y: {
      stacked: true,
      ticks: {
        beginAtZero: true,
        color: "white",
      }
    },
    x: {
      stacked: true,
      ticks: {
        color: "white",
        maxRotation: 0,
        minRotation: 0,
        autoSkipPadding: 10,
        labelOffset: 35
      }
    },
  },
  plugins: {  // 'legend' now within object 'plugins {}'
    legend: {
      labels: {
        color: "white",  // not 'fontColor:' anymore
        usePointStyle: true,
        boxWidth: 7,
      },
    },
    tooltip: {
      callbacks: {
        // label: (context) => context.dataset.label = 'sdfsdfds',
        title: (context) => context[0]?.label
      }
    }
  },
};


const RequestsStats = ({project, requestsStatsFilters}) => {
  const {token} = useUsers();
  const {getRequestsStats, requestsStats} = useRequestsStats();
  const [groupBy, setGroupBy] = useState('hours');

  useEffect(() => {
    (async () => token && await getRequestsStats(
      project.id, groupBy, makeRequestsStatsFilters(requestsStatsFilters)))()
  }, [token, project.id, groupBy, requestsStatsFilters]);

  return (
    <Container maxWidth={'xl'}>
      <StatsToolbar/>
      <StatsInfoGrid/>
      {/*<Grid container spacing={2}>*/}
      {/*  <Grid item xs={6}>*/}
      {/*    <StatsChart groupBy={groupBy} setGroupBy={setGroupBy}/>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={6}>*/}
      {/*    <StatsChart groupBy={groupBy} setGroupBy={setGroupBy}/>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      <Grid container spacing={2} className={'mt-2'}>
        <Grid item xs={6}>
          <Paper>
            <Bar data={requestsStats?.data} options={options}/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Bar data={requestsStats?.data} options={options}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  requestsStatsFilters: state.requests.requestsStatsFilters,
})

export default connect(
  getState,
  null,
)(RequestsStats);
