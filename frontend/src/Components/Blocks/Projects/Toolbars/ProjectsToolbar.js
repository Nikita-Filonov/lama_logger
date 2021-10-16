import React, {useState} from "react";
import clsx from "clsx";
import {Paper, Typography} from "@mui/material";
import {Search} from "../../Common/Search";
import {ViewRequestStyles} from "../../../../Styles/Blocks";


export const ProjectsToolbar = () => {
  const classes = ViewRequestStyles();
  const [search, setSearch] = useState('')

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex', classes.toolbarContainer)}
    >
      <Typography variant={'h6'} sx={{ml: 2}}>
        Projects
      </Typography>
      <div className={'flex-grow-1'}/>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder={'Search by url, code, method'}
      />
    </Paper>
  )
}
