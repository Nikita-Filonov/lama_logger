import React from "react";
import {Container, Fab} from "@mui/material";
import {common, ViewRequestStyles} from "../../Styles/Blocks";
import {Add} from "@mui/icons-material";

export const RequestsTracks = () => {
  const classes = ViewRequestStyles();

  return (
    <Container maxWidth={'xl'}>

      <Fab variant="extended" color={'primary'} style={common.fab}>
        <Add sx={{mr: 1}}/>
        NEW TRACK
      </Fab>
    </Container>
  )
}
