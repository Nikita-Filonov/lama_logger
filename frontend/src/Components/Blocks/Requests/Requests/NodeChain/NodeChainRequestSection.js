import React, {useState} from "react";
import {Paper, Tab, Tabs} from "@mui/material";
import {connect} from "react-redux";
import {setRequestChain} from "../../../../../Redux/Requests/Requests/requestsActions";
import Typography from "@mui/material/Typography";
import RequestSectionMenu from "../../../../Menus/Requests/CustomRequests/RequestSectionMenu";
import {HeaderDivider} from "../../CustomRequests/HeaderDivider";
import {RequestUrl} from "../../CustomRequests/Request/RequestUrl";
import {RequestSend} from "../../CustomRequests/Request/RequestSend";
import {tabsStyles} from "../../../../../Styles/Blocks";
import {TabPanel} from "../../../Common/Navigation/TabPanel";
import {RequestParams} from "../../CustomRequests/Request/RequestParams";
import RequestBody from "../../CustomRequests/Request/RequestBody";
import {RequestHeaders} from "../../CustomRequests/Request/RequestHeaders";
import Divider from "@mui/material/Divider";
import {MethodSelect} from "../../CustomRequests/Request/MethodSelect";
import {useRequests} from "../../../../../Providers/Requests/RequestsProvider";

const NodeChainRequestSection = ({project, requestChain, setRequestChain}) => {
  const {request, sendRequest} = useRequests();
  const [requestTab, setRequestTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);

  const onSendRequest = async () => await sendRequest(project?.id, requestChain?.requestId);

  return (
    <Paper sx={{p: 1}} elevation={3}>
      <div className={'d-flex align-items-center'}>
        <Typography>Request</Typography>
        <div className={'flex-grow-1'}/>
        <RequestSectionMenu/>
      </div>
      <HeaderDivider/>
      <div className={'d-flex'}>
        <MethodSelect customRequest={requestChain} setCustomRequest={setRequestChain}/>
        <RequestUrl customRequest={requestChain} setCustomRequest={setRequestChain}/>
        <RequestSend request={request} sendRequest={onSendRequest}/>
      </div>
      <Divider sx={{mt: 2}}/>
      <Tabs sx={tabsStyles} value={requestTab} onChange={onRequestTab} indicatorColor={'primary'} className={'mt-3'}>
        <Tab sx={tabsStyles} color={'primary'} label="Headers"/>
        <Tab sx={tabsStyles} color={'primary'} label="Body"/>
        <Tab sx={tabsStyles} color={'primary'} label="Params"/>
      </Tabs>
      <TabPanel value={requestTab} index={0} component={'span'}>
        <RequestHeaders customRequest={requestChain} setCustomRequest={setRequestChain}/>
      </TabPanel>
      <TabPanel value={requestTab} index={1}>
        <RequestBody customRequest={requestChain} setCustomRequest={setRequestChain}/>
      </TabPanel>
      <TabPanel value={requestTab} index={2}>
        <RequestParams customRequest={requestChain} setCustomRequest={setRequestChain}/>
      </TabPanel>
    </Paper>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  requestChain: state.requests.requestChain,
})

export default connect(
  getState,
  {
    setRequestChain
  },
)(NodeChainRequestSection);
