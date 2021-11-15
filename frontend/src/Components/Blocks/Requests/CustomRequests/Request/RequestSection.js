import React, {useState} from "react";
import {Divider, Paper, Tab, Tabs, Typography} from "@mui/material";
import {TabPanel} from "../../../Common/Navigation/TabPanel";
import {tabsStyles} from "../../../../../Styles/Blocks";
import {HeaderDivider} from "../HeaderDivider";
import {MethodSelect} from "./MethodSelect";
import {RequestHeaders} from "./RequestHeaders";
import RequestBody from "./RequestBody";
import RequestSectionMenu from "../../../../Menus/Requests/CustomRequests/RequestSectionMenu";
import {RequestParams} from "./RequestParams";
import {RequestUrl} from "./RequestUrl";
import {RequestSend} from "./RequestSend";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {useCustomRequests} from "../../../../../Providers/Requests/CustomRequestsPorvider";

const RequestSection = ({project, customRequest, setCustomRequest}) => {
  const {request, sendCustomRequest, createCustomRequestsHistory} = useCustomRequests();
  const [requestTab, setRequestTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);

  const sendRequest = async () => {
    await sendCustomRequest(project.id, customRequest.requestId)
    await createCustomRequestsHistory(project.id, customRequest);
  }

  return (
    <Paper sx={{p: 1}} elevation={3}>
      <div className={'d-flex align-items-center'}>
        <Typography>Request</Typography>
        <div className={'flex-grow-1'}/>
        <RequestSectionMenu/>
      </div>
      <HeaderDivider/>
      <div className={'d-flex'}>
        <MethodSelect customRequest={customRequest} setCustomRequest={setCustomRequest}/>
        <RequestUrl customRequest={customRequest} setCustomRequest={setCustomRequest}/>
        <RequestSend request={request} sendRequest={sendRequest}/>
      </div>
      <Divider sx={{mt: 2}}/>
      <Tabs sx={tabsStyles} value={requestTab} onChange={onRequestTab} indicatorColor={'primary'} className={'mt-3'}>
        <Tab sx={tabsStyles} color={'primary'} label="Headers"/>
        <Tab sx={tabsStyles} color={'primary'} label="Body"/>
        <Tab sx={tabsStyles} color={'primary'} label="Params"/>
      </Tabs>
      <TabPanel value={requestTab} index={0} component={'span'}>
        <RequestHeaders customRequest={customRequest} setCustomRequest={setCustomRequest}/>
      </TabPanel>
      <TabPanel value={requestTab} index={1}>
        <RequestBody customRequest={customRequest} setCustomRequest={setCustomRequest}/>
      </TabPanel>
      <TabPanel value={requestTab} index={2}>
        <RequestParams customRequest={customRequest} setCustomRequest={setCustomRequest}/>
      </TabPanel>
    </Paper>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  customRequest: state.customRequests.customRequest,
})

export default connect(
  getState,
  {
    setCustomRequest
  },
)(RequestSection);
