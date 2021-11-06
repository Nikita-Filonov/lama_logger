import React, {useState} from "react";
import {Button, Divider, IconButton, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import {DragHandle, Send} from "@mui/icons-material";
import {TabPanel} from "../../../Common/Navigation/TabPanel";
import {tabsStyles} from "../../../../../Styles/Blocks";
import {HeaderDivider} from "../HeaderDivider";
import MethodSelect from "./MethodSelect";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import RequestHeaders from "./RequestHeaders";

const RequestSection = ({customRequest, setCustomRequest}) => {
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
      <HeaderDivider/>

      <div className={'d-flex'}>
        <MethodSelect/>
        <TextField
          value={customRequest?.requestUrl}
          onChange={event => setCustomRequest({...customRequest, requestUrl: event.target.value})}
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
        <Tab sx={tabsStyles} color={'primary'} label="Body"/>
        <Tab sx={tabsStyles} color={'primary'} label="Params"/>
      </Tabs>
      <TabPanel value={requestTab} index={0} component={'span'}>
        <RequestHeaders/>
      </TabPanel>
      <TabPanel value={requestTab} index={1}>
        dsdsfsdf
      </TabPanel>
      <TabPanel value={requestTab} index={2}>
        dsdsfsdf
      </TabPanel>
    </Paper>
  )
}

const getState = (state) => ({
  customRequest: state.customRequests.customRequest,
})

export default connect(
  getState,
  {
    setCustomRequest
  },
)(RequestSection);
