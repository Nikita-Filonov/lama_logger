import React, {memo} from "react";
import {Container, Grid} from "@mui/material";
import StatsToolbar from "../../Components/Blocks/Requests/Stats/Tools/StatsToolbar";
import StatsInfoGrid from "../../Components/Blocks/Requests/Stats/StatsInfoGrid";
import NumberOfRequestsChart from "../../Components/Blocks/Requests/Stats/Charts/NumberOfRequestsChart";
import RatioStatusCodesChart from "../../Components/Blocks/Requests/Stats/Charts/RatioStatusCodesChart";
import ResponseTimeChart from "../../Components/Blocks/Requests/Stats/Charts/ResponseTimeChart";
import {useRequestsStats} from "../../Providers/Requests/RequestsStatsProvider";
import {ChartSkeletons} from "../../Components/Blocks/Requests/Stats/Tools/ChartSkeletons";
import CommonHandler from "../../Components/Blocks/Common/Handlers/CommonHandler";


const RequestsStats = () => {
  const {loadResponseTime, loadNumberOfRequests, loadRatioStatusCodes} = useRequestsStats();

  return (
    <Container maxWidth={'xl'}>
      <StatsToolbar/>
      <CommonHandler>
        <StatsInfoGrid/>
      </CommonHandler>
      {/*<Grid container spacing={2}>*/}
      {/*  <Grid item xs={6}>*/}
      {/*    <StatsChart groupBy={groupBy} setGroupBy={setGroupBy}/>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={6}>*/}
      {/*    <StatsChart groupBy={groupBy} setGroupBy={setGroupBy}/>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      <Grid container spacing={2} sx={{mt: 0.5, mb: 4}}>
        <Grid item xs={6}>
          {loadNumberOfRequests
            ? <ChartSkeletons/>
            : <CommonHandler>
              <NumberOfRequestsChart/>
            </CommonHandler>
          }
        </Grid>
        <Grid item xs={6}>
          {loadRatioStatusCodes
            ? <ChartSkeletons/>
            : <CommonHandler>
              <RatioStatusCodesChart/>
            </CommonHandler>
          }
        </Grid>
        <Grid item xs={6}>
          {loadResponseTime
            ? <ChartSkeletons/>
            : <CommonHandler>
              <ResponseTimeChart/>
            </CommonHandler>
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default memo(RequestsStats);
