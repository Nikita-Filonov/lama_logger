import React from "react";
import {Container, Grid, IconButton, Paper, Tabs, Tab} from "@mui/material";
import clsx from "clsx";
import {tabsStyles, ViewRequestStyles} from "../../Styles/Blocks";
import {Add} from "@mui/icons-material";
import {RequestSection} from "../../Components/Blocks/Requests/CustomRequests/Request/RequestSection";
import {ResponseSection} from "../../Components/Blocks/Requests/CustomRequests/Response/ResponseSection";
import {RecentRequests} from "../../Components/Blocks/Requests/CustomRequests/RecentRequests";
import Divider from "@mui/material/Divider";


export const CustomRequests = () => {
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

      <div className={'d-flex'}>
        <Grid container spacing={2} sx={{mt: 1}}>
          <Grid item xs={3}>
            <RecentRequests/>
          </Grid>
          <Grid item xs={9}>
            <RequestSection/>
            <ResponseSection/>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
