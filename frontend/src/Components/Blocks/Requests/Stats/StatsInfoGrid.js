import React from "react";
import {Grid, Paper, Typography} from "@mui/material";
import {Skeleton} from "@mui/lab";
import {useSettings} from "../../../../Providers/SettingsProvider";
import {useRequestsStats} from "../../../../Providers/Requests/RequestsStatsProvider";
import {ViewRequestStyles} from "../../../../Styles/Blocks";

export const StatsInfoGrid = () => {
  const classes = ViewRequestStyles();
  const {settings} = useSettings();
  const {load, requestsStats} = useRequestsStats();

  return (
    <Grid container spacing={2} className={'mt-2'}>
      <Grid item xs={3}>
        <Paper elevation={3} className={classes.toolbarContainer}>
          <Typography>Total requests</Typography>
          <Typography className={'mt-2'} variant={'h5'}>
            {load ? <Skeleton animation={settings.skeletonAnimation}/> : requestsStats?.total}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} className={classes.toolbarContainer}>
          <Typography>Created</Typography>
          <Typography className={'mt-2'} variant={'h5'}>
            {load ? <Skeleton animation={settings.skeletonAnimation}/> : requestsStats?.create}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} className={classes.toolbarContainer}>
          <Typography>Removed</Typography>
          <Typography className={'mt-2'} variant={'h5'}>
            {load ? <Skeleton animation={settings.skeletonAnimation}/> : requestsStats?.delete}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} className={classes.toolbarContainer}>
          <Typography>Filtered</Typography>
          <Typography className={'mt-2'} variant={'h5'}>
            {load ? <Skeleton animation={settings.skeletonAnimation}/> : requestsStats?.filter}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}
