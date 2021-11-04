import React, {useState} from "react";
import {Button, Divider, IconButton, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
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

      <div className={'d-flex'}>
        <Button
          sx={{mr: 2}}
          variant={'outlined'}
          color={'inherit'}
          className={classes.methodButton}
          endIcon={<KeyboardArrowDownIcon/>}
        >
          POST
        </Button>
        <TextField
          fullWidth
          className={'w-100'}
          variant={'standard'}
          placeholder={'Enter url'}
        />
        <Button sx={{ml: 2, pr: 2, pl: 2}} endIcon={<Send/>}>Send</Button>
      </div>
      <Divider sx={{mt: 2}}/>
      <Tabs sx={tabsStyles} value={requestTab} onChange={onRequestTab} indicatorColor={'primary'} className={'mt-3'}>
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
    </Paper>
  )
}
