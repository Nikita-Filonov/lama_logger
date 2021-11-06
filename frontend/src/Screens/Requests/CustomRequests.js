import React, {useEffect} from "react";
import {Container, Grid} from "@mui/material";
import RequestSection from "../../Components/Blocks/Requests/CustomRequests/Request/RequestSection";
import {ResponseSection} from "../../Components/Blocks/Requests/CustomRequests/Response/ResponseSection";
import RequestsHistory from "../../Components/Blocks/Requests/CustomRequests/RequestsHistory";
import RequestsTabs from "../../Components/Blocks/Requests/CustomRequests/RequestsTabs";
import {useCustomRequests} from "../../Providers/Requests/CustomRequestsPorvider";
import {connect} from "react-redux";

const CustomRequests = ({project, customRequest}) => {
  const {updateCustomRequest} = useCustomRequests();

  useEffect(() => {
    const timeout = setTimeout(async () =>
      await updateCustomRequest(project.id, customRequest.requestId, customRequest), 700);
    return () => clearTimeout(timeout);
  }, [customRequest])

  return (
    <Container maxWidth={'xl'}>
      <RequestsTabs/>
      <div className={'d-flex'}>
        <Grid container spacing={2} sx={{mt: 1}}>
          <Grid item xs={4}>
            <RequestsHistory/>
          </Grid>
          <Grid item xs={8}>
            <RequestSection/>
            <ResponseSection/>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  customRequest: state.customRequests.customRequest,
})

export default connect(
  getState,
  null,
)(CustomRequests);
