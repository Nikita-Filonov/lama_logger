import React, {useEffect, useState} from "react";
import {Container, Grid} from "@mui/material";
import StatsToolbar from "../../Components/Blocks/Requests/Stats/StatsToolbar";
import {useRequestsStats} from "../../Providers/Requests/RequestsStatsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/Users/UsersProvider";
import {StatsInfoGrid} from "../../Components/Blocks/Requests/Stats/StatsInfoGrid";
import {makeRequestsStatsFilters} from "../../Utils/Utils/Filters";
import {CommonStatsChart} from "../../Components/Blocks/Requests/Stats/CommonStatsChart";
import {ResponseTimeChart} from "../../Components/Blocks/Requests/Stats/ResponseTimeChart";


const RequestsStats = ({project, requestsStatsFilters}) => {
  const {token} = useUsers();
  const {getRequestsStats} = useRequestsStats();
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
          <CommonStatsChart/>
        </Grid>
        <Grid item xs={6}>
          <ResponseTimeChart/>
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
