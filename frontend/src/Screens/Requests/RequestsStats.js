import React, {memo} from "react";
import {Container, Grid} from "@mui/material";
import StatsToolbar from "../../Components/Blocks/Requests/Stats/Tools/StatsToolbar";
import {StatsInfoGrid} from "../../Components/Blocks/Requests/Stats/StatsInfoGrid";
import {CommonStatsChart} from "../../Components/Blocks/Requests/Stats/Charts/CommonStatsChart";
import RatioStatusCodesChart from "../../Components/Blocks/Requests/Stats/Charts/RatioStatusCodesChart";


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
          <RatioStatusCodesChart/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default memo(RequestsStats);
