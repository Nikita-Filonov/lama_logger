import React from "react";
import {Container} from "@mui/material";
import {connect} from "react-redux";
import {setTrack} from "../../../Redux/Requests/Tracks/tracksActions";
import {ViewTrackToolbar} from "../../../Components/Blocks/Tracks/Toolbar/ViewTrackToolbar";
import {useTracks} from "../../../Providers/Requests/Tracks/TracksProvider";

const ViewTrack = ({project, track, setTrack}) => {
  const {load} = useTracks();

  return (
    <Container maxWidth={'xl'}>
      <ViewTrackToolbar/>


    </Container>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  track: state.tracks.track,
})

export default connect(
  getState,
  {
    setTrack,
  },
)(ViewTrack);
