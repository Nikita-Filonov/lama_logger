import React from "react";
import {Button, Container, Divider, IconButton, Paper, Tab, Tabs} from "@mui/material";
import clsx from "clsx";
import {ViewRequestStyles} from "../../Styles/Blocks";
import {Add} from "@mui/icons-material";

const tabsStyles = {minHeight: 28, height: 28}

export const RequestsSend = () => {
  const classes = ViewRequestStyles();

  return (
    <Container maxWidth={'xl'}>
      <Paper
        elevation={3}
        className={clsx('mt-3 d-flex align-items-center', classes.toolbarContainer)}
      >
        <Tabs
          sx={tabsStyles}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab sx={tabsStyles} label="Item One"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Two"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Three"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Four"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Five"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Six"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Six"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Six"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Six"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Six"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Six"/>
          <Divider style={{height: 28, width: 1}}/>
          <Tab sx={tabsStyles} label="Item Six"/>

        </Tabs>
        <div className={'flex-grow-1'}/>
        <IconButton size={'small'}>
          <Add/>
        </IconButton>
      </Paper>
    </Container>
  )
}
