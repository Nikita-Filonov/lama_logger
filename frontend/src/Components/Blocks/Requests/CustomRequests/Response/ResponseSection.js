import React, {useState} from "react";
import {Paper, Tab, Tabs, Typography} from "@mui/material";
import {TabPanel} from "../../../Common/Navigation/TabPanel";
import {tabsStyles} from "../../../../../Styles/Blocks";
import IconButton from "@mui/material/IconButton";
import {DragHandle} from "@mui/icons-material";
import {HeaderDivider} from "../HeaderDivider";
import {ResponseHeaders} from "./ResponseHeaders";
import {useSelector} from "react-redux";
import {Body} from "../../Requests/ViewRequest/Body";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import clsx from "clsx";
import {useWindowSize} from "../../../../../Utils/Hooks/LayoutHooks";
import {StatusCodeIndicator} from "../../Requests/StatusCodeIndicator";

export const ResponseSection = () => {
  const {width} = useWindowSize();
  const classes = CustomRequestsStyles();
  const [requestTab, setRequestTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);
  const customRequests = useSelector(state => state.customRequests.customRequest);

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
      <div className={'d-flex align-items-center'}>
        <Tabs sx={tabsStyles} value={requestTab} onChange={onRequestTab} indicatorColor={'primary'} className={'mt-3'}>
          <Tab sx={tabsStyles} label="Headers"/>
          <Tab sx={tabsStyles} label="Body"/>
        </Tabs>
        <div className={'flex-grow-1'}/>
        <Typography>{customRequests?.statusCode}</Typography>
        <StatusCodeIndicator statusCode={customRequests?.statusCode}/>
      </div>
      <TabPanel value={requestTab} index={0}>
        <ResponseHeaders/>
      </TabPanel>
      <TabPanel value={requestTab} index={1}>
        <div className={clsx(classes.requestHeadersContainer)}
             style={{display: 'inline-block', width: width / 1.67, wordWrap: 'break-word'}}>
          {customRequests?.responseBody && <Body
            body={JSON.stringify(customRequests?.responseBody)}
            responseHeaders={customRequests?.responseHeaders}
          />}
        </div>
      </TabPanel>
    </Paper>
  )
}
