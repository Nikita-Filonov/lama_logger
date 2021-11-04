import React, {memo, useState} from "react";
import {Box, Link, Tab, Tabs, Typography} from "@mui/material";
import {connect} from "react-redux";
import {setRequest} from "../../../../../Redux/Requests/Requests/requestsActions";
import ViewRequestMenu from "../../../../Menus/Requests/Requests/ViewRequestMenu";
import {TabPanel} from "../../../Common/TabPanel";
import {Headers} from "./Headers";
import {Body} from "./Body";
import moment from "moment";
import {AccessTime} from "@mui/icons-material";
import {tabsStyles} from "../../../../../Styles/Blocks";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ViewRequestAccordion = ({request, viewMode}) => {
  const [requestTab, setRequestTab] = useState(0);
  const [responseTab, setResponseTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);
  const onResponseTab = (event, newValue) => setResponseTab(newValue);


  return (
    <Box sx={viewMode.requests === 'accordion' ? {m: 1} : {pl: 2, pr: 1, pb: 2}}>
      <div className={'d-flex justify-content-center align-items-center'}>
        <Typography variant="h6" gutterBottom component="div" className={'mt-3'} style={{fontSize: 17}}>
          {request?.method} request to <Link href={request?.requestUrl} target={'_blank'}>{request?.requestUrl}</Link>
        </Typography>
        <div className={'flex-grow-1'}/>
        {viewMode.requests === 'accordion' && <ViewRequestMenu request={request}/>}
      </div>
      <Typography variant={'subtitle1'} gutterBottom>Request</Typography>
      <Tabs sx={tabsStyles} value={requestTab} onChange={onRequestTab} indicatorColor={'primary'}>
        <Tab sx={tabsStyles} label="Headers"  {...a11yProps(0)} />
        <Tab sx={tabsStyles} label="Body" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={requestTab} index={0}>
        <Headers headers={request?.requestHeaders}/>
      </TabPanel>
      <TabPanel value={requestTab} index={1}>
        <Body responseHeaders={request?.requestHeaders} body={request?.requestBody}/>
      </TabPanel>

      <Typography variant={'subtitle1'} gutterBottom>Response</Typography>
      <Tabs sx={tabsStyles} value={responseTab} onChange={onResponseTab} indicatorColor={'primary'}>
        <Tab sx={tabsStyles} color={'primary'} label="Headers" {...a11yProps(0)} />
        <Tab sx={tabsStyles} label="Body" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={responseTab} index={0}>
        <Headers headers={request?.responseHeaders}/>
      </TabPanel>
      <TabPanel value={responseTab} index={1}>
        <Body responseHeaders={request?.responseHeaders} body={request?.responseBody}/>
      </TabPanel>

      <div className={'d-flex align-items-center'}>
        <AccessTime fontSize={'small'}/>
        <Typography sx={{ml: 1}} variant={'subtitle1'}>Duration {request?.duration * 1000} milliseconds</Typography>
        <div className={'flex-grow-1'}/>
        <Typography variant={'body2'} sx={{mr: 2}}>
          {moment.utc(request.created).local().startOf('seconds').fromNow()}
        </Typography>
      </div>
    </Box>
  )
}

const getState = (state) => ({
  viewMode: state.users.viewMode,
})

export default connect(
  getState,
  {
    setRequest,
  },
)(memo(ViewRequestAccordion));
