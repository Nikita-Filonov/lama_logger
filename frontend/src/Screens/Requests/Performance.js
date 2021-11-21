import React from "react";
import {Container} from "@mui/material";
import {connect} from "react-redux";

const Performance = ({project, customRequest}) => {


  return (
    <Container maxWidth={'xl'}>

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
)(Performance);
