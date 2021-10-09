import React from "react";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {ProjectSettingsStyles} from "../../../../../Styles/Screens";
import clsx from "clsx";

export const MembersHeader = () => {
  const classes = ProjectSettingsStyles();

  return (
    <div className={clsx('d-flex justify-content-center align-items-center', classes.headerContainer)}>
      <Typography variant="subtitle1" gutterBottom>Project members</Typography>
      <div className={'flex-grow-1'}/>
      <TextField
        className={'w-25'}
        variant={'standard'}
        label={'Search'}
        placeholder={'Search by username, email, role'}
      />
    </div>
  )
}
