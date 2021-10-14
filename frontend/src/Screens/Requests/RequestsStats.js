import React, {useEffect} from "react";
import {Container} from "@mui/material";
import {StatsChart} from "../../Components/Blocks/Requests/Stats/StatsChart";
import {StatsToolbar} from "../../Components/Blocks/Requests/Stats/StatsToolbar";
import {useRequestsStats} from "../../Providers/Requests/RequestsStatsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";
import {StatsInfoGrid} from "../../Components/Blocks/Requests/Stats/StatsInfoGrid";

const RequestsStats = ({project}) => {
  const {token} = useUsers();
  const {getRequestsStats} = useRequestsStats();

  useEffect(() => {
    (async () => token && await getRequestsStats(project.id))()
  }, [token, project.id])

  return (
    <Container maxWidth={'xl'}>
      <StatsToolbar/>
      <StatsInfoGrid/>
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
