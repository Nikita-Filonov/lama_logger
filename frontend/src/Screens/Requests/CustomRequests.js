import React, {useEffect} from "react";
import {Container, Grid} from "@mui/material";
import RequestSection from "../../Components/Blocks/Requests/CustomRequests/Request/RequestSection";
import {ResponseSection} from "../../Components/Blocks/Requests/CustomRequests/Response/ResponseSection";
import RequestsHistory from "../../Components/Blocks/Requests/CustomRequests/History/RequestsHistory";
import RequestsTabs from "../../Components/Blocks/Requests/CustomRequests/RequestsTabs";
import {useCustomRequests} from "../../Providers/Requests/CustomRequestsPorvider";
import {connect} from "react-redux";

const CustomRequests = ({project, customRequest}) => {
  const {updateCustomRequest} = useCustomRequests();

  useEffect(() => {
    const timeout = setTimeout(async () => (project.id && customRequest?.requestId) &&
      await updateCustomRequest(project.id, customRequest?.requestId, customRequest),
      700
    );
    return () => clearTimeout(timeout);
  }, [project.id, customRequest?.requestUrl, customRequest?.method,
    customRequest?.requestBody, customRequest?.requestHeaders, customRequest?.queryParams])

  return (
    <Container maxWidth={'xl'}>
      <RequestsTabs/>
      <div className={'d-flex'}>
        <Grid container spacing={2} sx={{mt: 0.5}}>
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
