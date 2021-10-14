import React, {useEffect} from "react";
import {Container, Grid, Paper, Typography} from "@mui/material";
import {ViewRequestStyles} from "../../Styles/Blocks";
import {StatsChart} from "../../Components/Blocks/Requests/Stats/StatsChart";
import {StatsToolbar} from "../../Components/Blocks/Requests/Stats/StatsToolbar";
import {useRequestsStats} from "../../Providers/Requests/RequestsStatsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";

const RequestsStats = ({project}) => {
  const classes = ViewRequestStyles();
  const {token} = useUsers();
  const {requestsStats, getRequestsStats} = useRequestsStats();

  useEffect(() => {
    (async () => token && await getRequestsStats(project.id))()
  }, [token, project.id])

  return (
    <Container maxWidth={'xl'}>
      <StatsToolbar/>
      <Grid container spacing={2} className={'mt-3'}>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Total requests</Typography>
            <Typography className={'mt-2'} variant={'h5'}>{requestsStats?.create}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Removed</Typography>
            <Typography className={'mt-2'} variant={'h5'}>{requestsStats?.delete}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Filtered</Typography>
            <Typography className={'mt-2'} variant={'h5'}>{requestsStats?.filter}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <StatsChart/>

    </Container>
  )
}


const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  null,
)(RequestsStats);
