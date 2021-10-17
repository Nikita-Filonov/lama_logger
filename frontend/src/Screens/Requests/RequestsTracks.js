import React, {useState} from "react";
import {Container, Fab} from "@mui/material";
import {common} from "../../Styles/Blocks";
import {Add} from "@mui/icons-material";
import TracksTable from "../../Components/Blocks/Requests/Tracks/TracksTable/TracksTable";
import TracksToolbar from "../../Components/Blocks/Requests/Tracks/Toolbars/TracksToolbar";
import CreateTrack from "../../Components/Modals/Requests/Tracks/CreateTrack";

export const RequestsTracks = () => {
  const [createTrackModal, setCreateTrackModal] = useState(false);

  return (
    <Container maxWidth={'xl'}>
      <TracksToolbar/>
      <div className={'mt-3'}>
        <TracksTable/>
      </div>
      <Fab variant="extended" color={'primary'} style={common.fab} onClick={() => setCreateTrackModal(true)}>
        <Add sx={{mr: 1}}/>
        NEW TRACK
      </Fab>
      <CreateTrack modal={createTrackModal} setModal={setCreateTrackModal}/>
    </Container>
  )
}
