import React, {useEffect, useState} from "react";
import {Container} from "@mui/material";
import {StatsChart} from "../../Components/Blocks/Requests/Stats/StatsChart";
import StatsToolbar from "../../Components/Blocks/Requests/Stats/StatsToolbar";
import {useRequestsStats} from "../../Providers/Requests/RequestsStatsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/Users/UsersProvider";
import {StatsInfoGrid} from "../../Components/Blocks/Requests/Stats/StatsInfoGrid";
import {makeRequestsStatsFilters} from "../../Utils/Utils/Filters";

const RequestsStats = ({project, requestsStatsFilters}) => {
  const {token} = useUsers();
  const {getRequestsStats} = useRequestsStats();
  const [groupBy, setGroupBy] = useState('hours');

  useEffect(() => {
    (async () => token && await getRequestsStats(
      project.id, groupBy, makeRequestsStatsFilters(requestsStatsFilters)))()
  }, [token, project.id, groupBy, requestsStatsFilters])

  return (
    <Container maxWidth={'xl'}>
      <StatsToolbar/>
      <StatsInfoGrid/>
      <StatsChart groupBy={groupBy} setGroupBy={setGroupBy}/>
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
