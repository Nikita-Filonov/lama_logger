import React, {useState} from "react";
import {Paper, Tab, Tabs, Typography} from "@mui/material";
import {TabPanel} from "../../../Common/Navigation/TabPanel";
import {tabsStyles} from "../../../../../Styles/Blocks";
import IconButton from "@mui/material/IconButton";
import {DragHandle} from "@mui/icons-material";
import {HeaderDivider} from "../HeaderDivider";
import {ResponseHeaders} from "./ResponseHeaders";
import {connect} from "react-redux";
import {Body} from "../../Requests/ViewRequest/Body";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import clsx from "clsx";
import {useWindowSize} from "../../../../../Utils/Hooks/LayoutHooks";
import {StatusCodeIndicator} from "../../Requests/StatusCodeIndicator";
import {isValidJson} from "../../../../../Utils/Utils/Validators";

const ResponseSection = ({customRequest}) => {
  const {width} = useWindowSize();
  const classes = CustomRequestsStyles();
  const [requestTab, setRequestTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);

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
        <Typography>{customRequest?.statusCode}</Typography>
        <StatusCodeIndicator statusCode={customRequest?.statusCode}/>
      </div>
      <TabPanel value={requestTab} index={0}>
        {customRequest?.responseHeaders
          ? <ResponseHeaders/>
          : <Typography>Headers will be shown after request is sent</Typography>
        }
      </TabPanel>
      <TabPanel value={requestTab} index={1}>
        <div className={clsx(classes.responseHeadersContainer)}
             style={{display: 'inline-block', width: width / 1.67, wordWrap: 'break-word'}}>
          {customRequest?.responseBody
            ? <Body
              body={isValidJson(customRequest?.responseBody)
                ? customRequest?.responseBody
                : JSON.stringify(customRequest?.responseBody)
              }
              responseHeaders={customRequest?.responseHeaders}
            />
            : <Typography>Body will be shown after request is sent</Typography>
          }
        </div>
      </TabPanel>
    </Paper>
  )
}

const getState = (state) => ({
  customRequest: state.customRequests.customRequest,
})

export default connect(
  getState,
  null,
)(ResponseSection);
