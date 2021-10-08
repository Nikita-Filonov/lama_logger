import React from "react";
import {blue} from "@material-ui/core/colors";
import {CircularProgress} from "@mui/material";


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
