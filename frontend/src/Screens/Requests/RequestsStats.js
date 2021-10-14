import React, {useEffect} from "react";
import {Container, Grid, Paper, Typography} from "@mui/material";
import {ViewRequestStyles} from "../../Styles/Blocks";
import {StatsChart} from "../../Components/Blocks/Requests/Stats/StatsChart";
import {StatsToolbar} from "../../Components/Blocks/Requests/Stats/StatsToolbar";
import {useRequestsStats} from "../../Providers/Requests/RequestsStatsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import {Skeleton} from "@mui/lab";
import {useSettings} from "../../Providers/SettingsProvider";

const RequestsStats = ({project}) => {
  const classes = ViewRequestStyles();
  const {token} = useUsers();
  const {settings} = useSettings();
  const {load, requestsStats, getRequestsStats} = useRequestsStats();

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
            <Typography className={'mt-2'} variant={'h5'}>
              {load ? <Skeleton animation={settings.skeletonAnimation}/> : requestsStats?.create}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Removed</Typography>
            <Typography className={'mt-2'} variant={'h5'}>
              {load ? <Skeleton animation={settings.skeletonAnimation}/> : requestsStats?.delete}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Filtered</Typography>
            <Typography className={'mt-2'} variant={'h5'}>
              {load ? <Skeleton animation={settings.skeletonAnimation}/> : requestsStats?.filter}
            </Typography>
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
