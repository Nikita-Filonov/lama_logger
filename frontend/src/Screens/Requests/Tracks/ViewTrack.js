import React from "react";
import {Container} from "@mui/material";
import {connect} from "react-redux";
import {setTrack} from "../../../Redux/Requests/Tracks/tracksActions";


const ViewTrack = ({project, track, setTrack}) => {


  return (
    <Container maxWidth={'xl'}>


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
