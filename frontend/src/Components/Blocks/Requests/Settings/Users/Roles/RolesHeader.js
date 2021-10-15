import React from "react";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {ProjectSettingsStyles} from "../../../../../../Styles/Screens";
import clsx from "clsx";

export const RolesHeader = () => {
  const classes = ProjectSettingsStyles();

  return (
    <div className={clsx('d-flex justify-content-center align-items-center', classes.headerContainer)}>
      <Typography variant="subtitle1" gutterBottom>Project roles</Typography>
      <div className={'flex-grow-1'}/>
      <TextField
        className={'w-25'}
        variant={'standard'}
        label={'Search'}
        placeholder={'Search by name'}
      />
    </div>
  )
}
