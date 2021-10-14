import React from "react";
import {CircularProgress} from "@mui/material";

export const Spinner = ({size=25}) =>
  <div style={{
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }}>
    <CircularProgress size={size}/>
  </div>
