import React from "react";
import {Container, Fab} from "@mui/material";
import {common} from "../../Styles/Blocks";
import {Add} from "@mui/icons-material";
import TracksTable from "../../Components/Blocks/Requests/Tracks/TracksTable/TracksTable";

export const RequestsTracks = () => {

  return (
    <Container maxWidth={'xl'}>
      <TracksTable/>
      <Fab variant="extended" color={'primary'} style={common.fab}>
        <Add sx={{mr: 1}}/>
        NEW TRACK
      </Fab>
    </Container>
  )
}
