import React, {useState} from "react";
import {Paper, Tab, Tabs, Typography} from "@mui/material";
import {TabPanel} from "../../../Common/Navigation/TabPanel";
import {tabsStyles} from "../../../../../Styles/Blocks";
import IconButton from "@mui/material/IconButton";
import {DragHandle} from "@mui/icons-material";
import {HeaderDivider} from "../HeaderDivider";

export const ResponseSection = () => {
  const [requestTab, setRequestTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);

  return (
    <Paper sx={{p: 1, mt: 2}} elevation={3}>
      <div className={'d-flex align-items-center'}>
        <Typography>Response</Typography>
        <div className={'flex-grow-1'}/>
        <IconButton size={'small'}>
          <DragHandle fontSize={'small'}/>
        </IconButton>
      </div>
      <HeaderDivider/>
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
