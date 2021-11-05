import React from "react";
import {Container, Grid} from "@mui/material";
import {RequestSection} from "../../Components/Blocks/Requests/CustomRequests/Request/RequestSection";
import {ResponseSection} from "../../Components/Blocks/Requests/CustomRequests/Response/ResponseSection";
import RecentRequests from "../../Components/Blocks/Requests/CustomRequests/RecentRequests";
import RequestsTabs from "../../Components/Blocks/Requests/CustomRequests/RequestsTabs";

export const CustomRequests = () => {


  return (
    <Container maxWidth={'xl'}>
      <RequestsTabs/>
      <div className={'d-flex'}>
        <Grid container spacing={2} sx={{mt: 1}}>
          <Grid item xs={4}>
            <RecentRequests/>
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
