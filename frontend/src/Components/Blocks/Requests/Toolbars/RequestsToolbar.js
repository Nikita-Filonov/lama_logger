import React from "react";
import {ViewRequestStyles} from "../../../../Styles/Blocks";
import clsx from "clsx";
import RequestsMenu from "../../../Menus/Requests/RequestsMenu";
import {Typography} from "@mui/material";

export const RequestsToolbar = () => {
  const classes = ViewRequestStyles()

  return (
    <div className={clsx('mt-3 d-flex justify-content-center align-items-center', classes.toolbarContainer)}>
      <Typography variant={'h6'}>Requests</Typography>
      <div className={'flex-grow-1'}/>
      <RequestsMenu/>
    </div>
  )
}

