import React, {useState} from "react";
import {Link, Tab, Tabs, Typography} from "@material-ui/core";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {setRequest} from "../../../Redux/Requests/requestsActions";
import ViewRequestMenu from "../../Menus/Requests/ViewRequestMenu";
import {ViewRequestStyles} from "../../../Styles/Blocks";
import {TabPanel} from "../Common/TabPanel";


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ViewRequestDemo = ({request}) => {
  const classes = ViewRequestStyles()
  const [requestTab, setRequestTab] = useState(0);
  const [responseTab, setResponseTab] = useState(0)

  const onRequestTab = (event, newValue) => setRequestTab(newValue);
  const onResponseTab = (event, newValue) => setResponseTab(newValue)


  return (
    <Box sx={{margin: 1}}>
      <div className={'d-flex justify-content-center align-items-center'}>
        <Typography variant="subtitle1" gutterBottom component="div" className={'mt-3'}>
          {request.method} request to <Link href={request.request_url} target={'_blank'}>{request.request_url}</Link>
        </Typography>
        <div className={'flex-grow-1'}/>
        <ViewRequestMenu/>
      </div>
      <Typography variant={'subtitle1'} gutterBottom>Request</Typography>
      <Tabs classes={{root: classes.tabsRoot}} value={requestTab} onChange={onRequestTab} indicatorColor={'primary'}>
        <Tab classes={{root: classes.tabRoot}} label="Headers"  {...a11yProps(0)} />
        <Tab classes={{root: classes.tabRoot}} label="Body" {...a11yProps(1)} />
        <Tab classes={{root: classes.tabRoot}} label="Params" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={requestTab} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={requestTab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={requestTab} index={2}>
        Item Three
      </TabPanel>

      <Typography variant={'subtitle1'} gutterBottom>Response</Typography>
      <Tabs classes={{root: classes.tabsRoot}} value={responseTab} onChange={onResponseTab} indicatorColor={'primary'}>
        <Tab classes={{root: classes.tabRoot}} color={'primary'} label="Headers" {...a11yProps(0)} />
        <Tab classes={{root: classes.tabRoot}} label="Body" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={responseTab} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={responseTab} index={1}>
        Item Two
      </TabPanel>

    </Box>
  )
}


export default connect(
  null,
  {
    setRequest,
  },
)(ViewRequestDemo);
