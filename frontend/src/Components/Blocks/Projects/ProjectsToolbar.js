import React, {useState} from "react";
import clsx from "clsx";
import {Paper, Typography} from "@mui/material";
import {Search} from "../Common/Search";
import {ViewRequestStyles} from "../../../Styles/Blocks";


export const ProjectsToolbar = ({title, search, setSearch, placeholder = ''}) => {
  const classes = ViewRequestStyles();

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex align-items-center', classes.toolbarContainer)}
    >
      <Typography variant={'h6'} sx={{ml: 2}}>{title}</Typography>
      <div className={'flex-grow-1'}/>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder={placeholder}
      />
    </Paper>
  )
}
