import React from "react";
import {CircularProgress} from "@mui/material";

export const Spinner = ({top = '70%', size = 25}) =>
  <div style={{
    position: 'absolute',
    left: '50%',
    top: top,
    transform: 'translate(-50%, -50%)'
  }}>
    <CircularProgress size={size}/>
  </div>
