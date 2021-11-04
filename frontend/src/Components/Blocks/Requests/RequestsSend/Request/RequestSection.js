import React, {useState} from "react";
import {Button, Divider, Grid, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Send} from "@mui/icons-material";
import {TabPanel} from "../../../Common/TabPanel";
import {tabsStyles} from "../../../../../Styles/Blocks";

export const RequestSection = () => {
  const [requestTab, setRequestTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);

  return (
    <Paper sx={{p: 1, mt: 2}} elevation={3} className={''}>
      <Typography>Request</Typography>
      <Divider sx={{mt: 1, mb: 1}}/>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Button
            fullWidth
            variant={'outlined'}
            color={'inherit'}
            className={'justify-content-start'}
            endIcon={<KeyboardArrowDownIcon/>}
          >
            POST
          </Button>
        </Grid>
        <Grid item xs={10}>
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
