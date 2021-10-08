import React from "react";
import {CircularProgress} from "@mui/material";
import {blue} from "@mui/material/colors";


export const ButtonSpinner = () => {
  return (
    <CircularProgress
      size={20}
      sx={{
        color: blue[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
      }}
    />
  )
}
