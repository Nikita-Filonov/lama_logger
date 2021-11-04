import React, {useState} from "react";
import {Button, Divider, Grid, IconButton, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {DragHandle, Send} from "@mui/icons-material";
import {TabPanel} from "../../../Common/TabPanel";
import {tabsStyles} from "../../../../../Styles/Blocks";
import {RequestsSendStyles} from "../../../../../Styles/Screens";

export const RequestSection = () => {
  const classes = RequestsSendStyles();
  const [requestTab, setRequestTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);

  return (
    <Paper sx={{p: 1}} elevation={3}>
      <div className={'d-flex align-items-center'}>
        <Typography>Request</Typography>
        <div className={'flex-grow-1'}/>
        <IconButton size={'small'}>
          <DragHandle fontSize={'small'}/>
        </IconButton>
      </div>
      <Divider sx={{mt: 1, mb: 1}}/>
      <Grid container spacing={2}>
        <Grid item xs={1.5}>
          <Button
            fullWidth
            variant={'outlined'}
            color={'inherit'}
            className={classes.methodButton}
            endIcon={<KeyboardArrowDownIcon/>}
          >
            POST
          </Button>
        </Grid>
        <Grid item xs={9.5}>
          <TextField
            fullWidth
            variant={'standard'}
            placeholder={'Enter url'}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            fullWidth
            endIcon={<Send/>}
          >
            Send
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{mt: 2}}/>
        </Grid>
        <Grid item xs={12}>
          <Tabs sx={tabsStyles} value={requestTab} onChange={onRequestTab} indicatorColor={'primary'}>
            <Tab sx={tabsStyles} color={'primary'} label="Headers"/>
            <Tab sx={tabsStyles} label="Body"/>
            <Tab sx={tabsStyles} label="Params"/>
          </Tabs>
          <TabPanel value={requestTab} index={0}>
            dsfsdfsdfsd
          </TabPanel>
          <TabPanel value={requestTab} index={1}>
            dsdsfsdf
          </TabPanel>
          <TabPanel value={requestTab} index={1}>
            dsdsfsdf
          </TabPanel>
        </Grid>
      </Grid>
    </Paper>
  )
}
