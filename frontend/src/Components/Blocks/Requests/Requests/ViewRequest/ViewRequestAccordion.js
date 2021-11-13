import React, {memo, useState} from "react";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {connect} from "react-redux";
import {setRequest} from "../../../../../Redux/Requests/Requests/requestsActions";
import ViewRequestMenu from "../../../../Menus/Requests/Requests/ViewRequestMenu";
import {TabPanel} from "../../../Common/Navigation/TabPanel";
import {Headers} from "./Headers";
import {Body} from "./Body";
import moment from "moment";
import {AccessTime} from "@mui/icons-material";
import {RequestsTableStyles, tabsStyles} from "../../../../../Styles/Blocks";
import {getDuration} from "../../../../../Utils/Utils/Common";
import RequestLink from "./RequestLink";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ViewRequestAccordion = ({request, viewMode}) => {
  const classes = RequestsTableStyles();
  const [requestTab, setRequestTab] = useState(0);
  const [responseTab, setResponseTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);
  const onResponseTab = (event, newValue) => setResponseTab(newValue);

  return (
    <Box
      sx={viewMode.requests === 'accordion' ? {m: 1} : {pl: 2, pr: 1, pb: 2, mt: 1}}
      className={viewMode.requests !== 'accordion' && classes.sidePanelContainer}
    >
      <div className={'d-flex justify-content-center align-items-center'}>
        <RequestLink request={request}/>
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
        <Typography
          sx={{ml: 1}}
          variant={'subtitle1'}
        >
          Duration {getDuration(request?.duration)} milliseconds
        </Typography>
        <div className={'flex-grow-1'}/>
        <Typography variant={'body2'} sx={{mr: 2}}>
          {moment.utc(request.created).local().startOf('seconds').fromNow()}
        </Typography>
      </div>
    </Box>
  )
}

const getState = (state) => ({
  viewMode: state.users.viewMode
})

export default connect(
  getState,
  {
    setRequest,
  },
)(memo(ViewRequestAccordion));
