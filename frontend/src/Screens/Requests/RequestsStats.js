import React, {memo} from "react";
import {Container, Grid} from "@mui/material";
import StatsToolbar from "../../Components/Blocks/Requests/Stats/StatsToolbar";
import {StatsInfoGrid} from "../../Components/Blocks/Requests/Stats/StatsInfoGrid";
import {CommonStatsChart} from "../../Components/Blocks/Requests/Stats/CommonStatsChart";
import {ResponseTimeChart} from "../../Components/Blocks/Requests/Stats/ResponseTimeChart";


const RequestsStats = () => {

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
          <CommonStatsChart/>
        </Grid>
        <Grid item xs={6}>
          <ResponseTimeChart/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default memo(RequestsStats);
