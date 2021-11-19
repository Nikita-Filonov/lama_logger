import React, {useEffect, useMemo, useState} from "react";
import {Paper, Tab, Tabs} from "@mui/material";
import {connect} from "react-redux";
import {setRequestChain, setRequestChainError} from "../../../../../Redux/Requests/Requests/requestsActions";
import Typography from "@mui/material/Typography";
import RequestSectionMenu from "../../../../Menus/Requests/CustomRequests/RequestSectionMenu";
import {HeaderDivider} from "../../CustomRequests/HeaderDivider";
import {RequestUrl} from "../../CustomRequests/Request/RequestUrl";
import {RequestSend} from "../../CustomRequests/Request/RequestSend";
import {RequestsTableStyles, tabsStyles} from "../../../../../Styles/Blocks";
import {TabPanel} from "../../../Common/Navigation/TabPanel";
import {RequestParams} from "../../CustomRequests/Request/RequestParams";
import RequestBody from "../../CustomRequests/Request/RequestBody";
import {RequestHeaders} from "../../CustomRequests/Request/RequestHeaders";
import Divider from "@mui/material/Divider";
import {MethodSelect} from "../../CustomRequests/Request/MethodSelect";
import {useRequests} from "../../../../../Providers/Requests/RequestsProvider";
import {INITIAL_REQUESTS} from "../../../../../Redux/Requests/Requests/initialState";
import {ResponseErrorAlert} from "../../CustomRequests/Response/ResponseErrorAlert";
import CommonHandler from "../../../Common/Handlers/CommonHandler";

const NodeChainRequestSection = (props) => {
  const {project, requestChain, setRequestChain, requestChainError, setRequestChainError} = props;
  const classes = RequestsTableStyles();
  const {request, sendRequest} = useRequests();
  const [requestTab, setRequestTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);

  const onSendRequest = async () => await sendRequest(project?.id, requestChain?.requestId);

  useEffect(() => setRequestChainError(INITIAL_REQUESTS.requestChainError), [requestChain?.requestId]);
  const hasError = useMemo(() => requestChainError?.data, [requestChainError]);
  const tabClasses = useMemo(
    () => hasError ? classes.nodeChainRequestSectionWithError : classes.nodeChainRequestSection,
    [hasError]
  )

  return (
    <Paper sx={{p: 1, height: '100%'}} elevation={3}>
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
        <CommonHandler>
          <RequestHeaders customRequest={requestChain} setCustomRequest={setRequestChain} containerClass={tabClasses}/>
        </CommonHandler>
      </TabPanel>
      <TabPanel value={requestTab} index={1}>
        <CommonHandler>
          <RequestBody customRequest={requestChain} setCustomRequest={setRequestChain} containerClass={tabClasses}/>
        </CommonHandler>
      </TabPanel>
      <TabPanel value={requestTab} index={2}>
        <CommonHandler>
          <RequestParams customRequest={requestChain} setCustomRequest={setRequestChain} containerClass={tabClasses}/>
        </CommonHandler>
      </TabPanel>
      {requestChainError?.data && <ResponseErrorAlert error={requestChainError} setError={setRequestChainError}/>}
    </Paper>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  requestChain: state.requests.requestChain,
  requestChainError: state.requests.requestChainError
})

export default connect(
  getState,
  {
    setRequestChain,
    setRequestChainError
  },
)(NodeChainRequestSection);
