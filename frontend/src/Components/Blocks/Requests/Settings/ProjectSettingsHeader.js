import React from "react";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import {ViewRequestStyles} from "../../../../Styles/Blocks";

export const ProjectSettingsHeader = ({title}) => {
  const classes = ViewRequestStyles();

  return (
    <Paper elevation={3} className={clsx('mt-4 d-flex', classes.toolbarContainer)}>
      <Typography variant="subtitle1">{title}</Typography>
    </Paper>
  )
}
