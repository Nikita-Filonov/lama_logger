import React, {useState} from "react";
import {
  Chip,
  Collapse,
  Grid,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import {METHOD_COLORS} from "../../../../Utils/Constants";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {common, tabsStyles} from "../../../../Styles/Blocks";
import {getStatusCodeColor, requestToCustomRequest} from "../../../../Utils/Utils/Formatters";
import {TabPanel} from "../../../Blocks/Common/Navigation/TabPanel";
import {Headers} from "../../../Blocks/Requests/Requests/ViewRequest/Headers";
import {Body} from "../../../Blocks/Requests/Requests/ViewRequest/Body";
import Divider from "@mui/material/Divider";
import {connect} from "react-redux";
import {setRequestChain} from "../../../../Redux/Requests/Requests/requestsActions";

const ChainedRequestAccordion = ({request, requestChain, setRequestChain}) => {
  const [open, setOpen] = useState(false);
  const [requestTab, setRequestTab] = useState(0);
  const [responseTab, setResponseTab] = useState(0);

  const onRequestTab = (event, newValue) => setRequestTab(newValue);
  const onResponseTab = (event, newValue) => setResponseTab(newValue);
  const onOpen = () => setOpen(!open);

  const onSelectRequest = async () => {
    const payload = await requestToCustomRequest(request);
    setRequestChain({...request, ...payload});
  }

  return (
    <React.Fragment>
      <ListItem
        divider
        disableGutters
        onClick={onSelectRequest}
        selected={requestChain?.requestId === request?.requestId}
      >
        <Grid container spacing={2}>
          <Grid item xs={1.5} md={1.5} lg={1.5} xl={1.5} sm={1.5}>
            <Typography color={METHOD_COLORS[request?.method]} sx={{ml: 1}}>{request?.method}</Typography>
          </Grid>
          <Grid item xs={9.5} md={9.5} lg={9.5} xl={9.5} sm={9.5}>
            <Typography style={common.ellipsisText}>{request?.requestUrl}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Chip
              size={'small'}
              sx={{backgroundColor: getStatusCodeColor(request?.statusCode), mr: 2}}
              label={request?.statusCode}
            />
          </Grid>
        </Grid>
        <ListItemSecondaryAction sx={{mr: 1}}>
          <IconButton size={'small'} onClick={onOpen}>
            {open ? <ExpandLess fontSize={'small'}/> : <ExpandMore fontSize={'small'}/>}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider/>

        <Typography variant={'subtitle1'} gutterBottom sx={{mt: 1}}>Request</Typography>
        <Tabs sx={tabsStyles} value={requestTab} onChange={onRequestTab} indicatorColor={'primary'}>
          <Tab sx={tabsStyles} label="Headers"/>
          <Tab sx={tabsStyles} label="Body"/>
        </Tabs>
        <TabPanel value={requestTab} index={0}>
          <Headers headers={request?.requestHeaders}/>
        </TabPanel>
        <TabPanel value={requestTab} index={1}>
          <Body responseHeaders={request?.requestHeaders} body={request?.requestBody}/>
        </TabPanel>

        <Typography variant={'subtitle1'} gutterBottom>Response</Typography>
        <Tabs sx={tabsStyles} value={responseTab} onChange={onResponseTab} indicatorColor={'primary'}>
          <Tab sx={tabsStyles} color={'primary'} label="Headers"/>
          <Tab sx={tabsStyles} label="Body"/>
        </Tabs>
        <TabPanel value={responseTab} index={0}>
          <Headers headers={request?.responseHeaders}/>
        </TabPanel>
        <TabPanel value={responseTab} index={1}>
          <Body responseHeaders={request?.responseHeaders} body={request?.responseBody}/>
        </TabPanel>
      </Collapse>
    </React.Fragment>
  )
}

const getState = (state) => ({
  requestChain: state.requests.requestChain
})

export default connect(
  getState,
  {
    setRequestChain
  },
)(ChainedRequestAccordion);
