import React from "react";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import {ViewRequestStyles} from "../../../../Styles/Blocks";
import {Search} from "../../Common/Search";

export const ProjectSettingsHeader = (props) => {
  const {title, search = null, setSearch = null, placeholder = ''} = props;
  const classes = ViewRequestStyles();

  return (
    <Paper elevation={3} className={clsx('mt-4 d-flex align-items-center', classes.toolbarContainer)}>
      <Typography variant="subtitle1">{title}</Typography>
      <div className={'flex-grow-1'}/>
      {setSearch && <Search search={search} setSearch={setSearch} placeholder={placeholder}/>}
    </Paper>
  )
}
