import React, {useEffect, useMemo, useState} from "react";
import {Alert, Paper, Tab, Tabs, Typography} from "@mui/material";
import {TabPanel} from "../../../Common/Navigation/TabPanel";
import {tabsStyles} from "../../../../../Styles/Blocks";
import IconButton from "@mui/material/IconButton";
import {AccessTime, DragHandle} from "@mui/icons-material";
import {HeaderDivider} from "../HeaderDivider";
import {ResponseHeaders} from "./ResponseHeaders";
import {connect} from "react-redux";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import {useWindowSize} from "../../../../../Utils/Hooks/LayoutHooks";
import {StatusCodeIndicator} from "../../Requests/StatusCodeIndicator";
import _ from 'lodash';
import {setCustomRequestError} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {INITIAL_CUSTOM_REQUESTS} from "../../../../../Redux/Requests/CustomRequests/initialState";
import {isValidJson} from "../../../../../Utils/Utils/Validators";
import {Body} from "../../Requests/ViewRequest/Body";
import ResponseErrorAlert from "./ResponseErrorAlert";
import {getDuration} from "../../../../../Utils/Utils/Common";


const ResponseSection = ({customRequest, customRequestError, setCustomRequestError}) => {
  const {width} = useWindowSize();
  const classes = CustomRequestsStyles();
  const [requestTab, setRequestTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);

  const isRequestValid = useMemo(
    () => customRequest?.statusCode && !_.isEmpty(customRequest?.responseHeaders) && customRequest?.responseBody,
    [customRequest]
  )

  useEffect(() => setCustomRequestError(INITIAL_CUSTOM_REQUESTS.customRequestError), [customRequest?.requestId]);

  return (
    <Paper sx={{p: 1, mt: 2, mb: 4}} elevation={3}>
      <div className={'d-flex align-items-center'}>
        <Typography>Response</Typography>
        <div className={'flex-grow-1'}/>
        <IconButton size={'small'}>
          <DragHandle fontSize={'small'}/>
        </IconButton>
      </div>
      <HeaderDivider/>
      {/*when no error data and no response*/}
      {(!customRequestError?.data && !isRequestValid) &&
      <Alert variant="outlined" severity={'info'}>
        Response will be shown after request is sent
      </Alert>}
      {/*when some error happens*/}
      {customRequestError?.data && <ResponseErrorAlert/>}
      {/*when response is valid*/}
      {isRequestValid && <div>
        <div className={'d-flex align-items-center'}>
          <Tabs sx={tabsStyles} value={requestTab} onChange={onRequestTab} indicatorColor={'primary'}
                className={'mt-3'}>
            <Tab sx={tabsStyles} label="Headers"/>
            <Tab sx={tabsStyles} label="Body"/>
          </Tabs>
          <div className={'flex-grow-1'}/>
          <AccessTime fontSize={'small'}/>
          <Typography
            sx={{mr: 1.5, ml: 1}}
            variant={'subtitle1'}
          >
            Duration {getDuration(customRequest?.duration)} milliseconds
          </Typography>
          <Typography>{customRequest?.statusCode}</Typography>
          <StatusCodeIndicator statusCode={customRequest?.statusCode}/>
        </div>
        <TabPanel value={requestTab} index={0}>
          <ResponseHeaders/>
        </TabPanel>
        <TabPanel value={requestTab} index={1}>
          <div className={classes.responseHeadersContainer}
               style={{display: 'inline-block', width: width / 1.67, wordWrap: 'break-word'}}>
            <Body
              body={isValidJson(customRequest?.responseBody)
                ? customRequest?.responseBody
                : JSON.stringify(customRequest?.responseBody)
              }
              responseHeaders={customRequest?.responseHeaders}
            />
          </div>
        </TabPanel>
      </div>}
    </Paper>
  )
}

const getState = (state) => ({
  customRequest: state.customRequests.customRequest,
  customRequestError: state.customRequests.customRequestError,
})

export default connect(
  getState,
  {
    setCustomRequestError
  },
)(ResponseSection);
