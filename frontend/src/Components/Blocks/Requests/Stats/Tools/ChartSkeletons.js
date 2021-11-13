import React from "react";
import {CircularProgress, Paper} from "@mui/material";

export const ChartSkeletons = () =>
  <Paper sx={{p: 1.5, display: 'flex', justifyContent: 'center', height: 400, alignItems: 'center'}}>
    <CircularProgress/>
  </Paper>
