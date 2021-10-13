import React from "react";
import {Container, Grid, Paper, Typography} from "@mui/material";
import clsx from "clsx";
import {ViewRequestStyles} from "../../Styles/Blocks";
import {StatsChart} from "../../Components/Blocks/Requests/Stats/StatsChart";

export const Stats = () => {
  const classes = ViewRequestStyles();

  return (
    <Container maxWidth={'xl'}>
      <Paper
        elevation={3}
        className={clsx('mt-3 d-flex', classes.toolbarContainer)}
      >
      </Paper>

      <Grid container spacing={2} className={'mt-3'}>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Total requests</Typography>
            <Typography className={'mt-2'} variant={'h5'}>5678</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Removed</Typography>
            <Typography className={'mt-2'} variant={'h5'}>5678</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Filtered</Typography>
            <Typography className={'mt-2'} variant={'h5'}>5678</Typography>
          </Paper>
        </Grid>
      </Grid>
      <StatsChart/>

    </Container>
  )
}
