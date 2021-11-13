import React from "react";
import {Grid, Paper, Skeleton, Typography} from "@mui/material";
import {useRequestsStats} from "../../../../Providers/Requests/RequestsStatsProvider";
import {StatsChartStyles} from "../../../../Styles/Blocks";
import {HelpOutline} from "@mui/icons-material";
import {connect, useSelector} from "react-redux";

const StatsInfoGrid = ({requestsStats}) => {
  const {loadRequestsStats} = useRequestsStats();
  const {skeletonAnimation} = useSelector(state => state.users.userSettings);

  return (
    <Grid container spacing={2} sx={{mt: 0.5}}>
      <Grid item xs={3}>
        <Paper elevation={3} style={StatsChartStyles.gridContainer}>
          <div className={'d-flex align-items-center'}>
            <Typography className={'flex-grow-1'}>Total requests</Typography>
            <HelpOutline fontSize={'small'}/>
          </div>
          <Typography className={'mt-2'} variant={'h5'}>
            {loadRequestsStats ? <Skeleton animation={skeletonAnimation}/> : requestsStats?.total}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} style={StatsChartStyles.gridContainer}>
          <div className={'d-flex align-items-center'}>
            <Typography className={'flex-grow-1'}>Created</Typography>
            <HelpOutline fontSize={'small'}/>
          </div>
          <Typography className={'mt-2'} variant={'h5'}>
            {loadRequestsStats ? <Skeleton animation={skeletonAnimation}/> : requestsStats?.create}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} style={StatsChartStyles.gridContainer}>
          <div className={'d-flex align-items-center'}>
            <Typography className={'flex-grow-1'}>Removed</Typography>
            <HelpOutline fontSize={'small'}/>
          </div>
          <Typography className={'mt-2'} variant={'h5'}>
            {loadRequestsStats ? <Skeleton animation={skeletonAnimation}/> : requestsStats?.delete}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={3} style={StatsChartStyles.gridContainer}>
          <div className={'d-flex align-items-center'}>
            <Typography className={'flex-grow-1'}>Filtered</Typography>
            <HelpOutline fontSize={'small'}/>
          </div>
          <Typography className={'mt-2'} variant={'h5'}>
            {loadRequestsStats ? <Skeleton animation={skeletonAnimation}/> : requestsStats?.filter}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

const getState = (state) => ({
  requestsStats: state.stats.requestsStats
})

export default connect(
  getState,
  null,
)(StatsInfoGrid);
