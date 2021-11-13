import React from "react";
import {Container, Grid} from "@mui/material";
import {connect} from "react-redux";
import {setTrack} from "../../../Redux/Requests/Tracks/tracksActions";
import {ViewTrackToolbar} from "../../../Components/Blocks/Requests/Tracks/Toolbar/ViewTrackToolbar";
import {useTracks} from "../../../Providers/Requests/Tracks/TracksProvider";
import TrackRequestsTable from "../../../Components/Blocks/Requests/Tracks/TrackRequestsTable/TrackRequestsTable";
import RequestsSideFilters from "../../../Components/Blocks/Requests/Requests/RequestsFilters/RequestsSideFilters";
import _ from "lodash";
import {RequestsTableSkeletons} from "../../../Components/Blocks/Requests/Requests/RequestsTableSkeletons";
import ViewRequestSidePanel from "../../../Components/Blocks/Requests/Requests/ViewRequest/ViewRequestSidePanel";
import TimeFilters from "../../../Components/Modals/Requests/Requests/Filters/TimeFilters";

const ViewTrack = ({project, track, setTrack, viewMode, trackRequest}) => {
  const {load} = useTracks();

  return (
    <Container maxWidth={'xl'}>
      <ViewTrackToolbar/>
      <div className={'d-flex mt-3'}>
        <RequestsSideFilters/>
        <Grid container>
          <Grid item xs={(viewMode.trackRequests === 'side' && !_.isEmpty(trackRequest)) ? 6 : 12}>
            {load ? <RequestsTableSkeletons/> : <TrackRequestsTable/>}
          </Grid>
          {(viewMode.trackRequests === 'side' && !_.isEmpty(trackRequest)) &&
          <Grid item xs={6}>
            <ViewRequestSidePanel/>
          </Grid>}
        </Grid>
      </div>

      {/*<Grid container spacing={4} className={'mt-3'}>*/}
      {/*  <Grid item xs={isRequestSelected ? 6 : 12}>*/}
      {/*    <RequestsTable/>*/}
      {/*  </Grid>*/}
      {/*  {isRequestSelected &&*/}
      {/*  <Grid item xs={6} style={{maxHeight: '75vh', overflow: 'auto', paddingTop: 0}}>*/}
      {/*    <ViewRequest/>*/}
      {/*  </Grid>}*/}
      {/*</Grid>*/}
      <TimeFilters/>
    </Container>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  track: state.tracks.track,
  viewMode: state.users.viewMode,
  trackRequest: state.tracks.trackRequest
})

export default connect(
  getState,
  {
    setTrack,
  },
)(ViewTrack);
