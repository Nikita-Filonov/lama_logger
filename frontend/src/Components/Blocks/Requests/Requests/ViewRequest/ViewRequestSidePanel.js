import React from "react";
import {Paper} from "@mui/material";
import ViewRequestAccordion from "./ViewRequestAccordion";

export const ViewRequestSidePanel = ({request}) => {
  return (
    <Paper sx={{ml: 2}}>
      <ViewRequestAccordion request={request}/>
    </Paper>
  )
}


