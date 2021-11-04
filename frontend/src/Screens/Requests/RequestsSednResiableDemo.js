import React, {useState} from "react";
import {Container, Grid, IconButton, Paper, Tabs} from "@mui/material";
import clsx from "clsx";
import {tabsStyles, ViewRequestStyles} from "../../Styles/Blocks";
import {Add} from "@mui/icons-material";
import {RequestSection} from "../../Components/Blocks/Requests/RequestsSend/Request/RequestSection";
import {ResponseSection} from "../../Components/Blocks/Requests/RequestsSend/Response/ResponseSection";
import {RecentRequests} from "../../Components/Blocks/Requests/RequestsSend/RecentRequests";


export const RequestsSend = () => {
  const classes = ViewRequestStyles();
  const [drag, setDrag] = useState({active: false, x: ""});
  const [leftWidth, setLeftWidth] = useState(400);
  const [rightWidth, setRightWidth] = useState(994);


  const startResize = e => setDrag({active: true, x: e.clientX});

  const resizeFrame = e => {
    const {active, x} = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);

      const isMovingLeft = x > e.clientX;

      setDrag({...drag, x: e.clientX});
      setLeftWidth(isMovingLeft ? leftWidth - xDiff : leftWidth + xDiff);
      setRightWidth(isMovingLeft ? rightWidth + xDiff : rightWidth - xDiff)
    }
  };

  const stopResize = () => setDrag({...drag, active: false});

  return (
    <Container maxWidth={'xl'} ref={}>
      <Paper
        elevation={3}
        className={clsx('mt-3 d-flex align-items-center', classes.toolbarContainer)}
      >
        <Tabs
          sx={tabsStyles}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          {/*<Tab sx={tabsStyles} label="Item One"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Two"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Three"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Four"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Five"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Six"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Six"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Six"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Six"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Six"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Six"/>*/}
          {/*<Divider style={{height: 28, width: 1}}/>*/}
          {/*<Tab sx={tabsStyles} label="Item Six"/>*/}

        </Tabs>
        <div className={'flex-grow-1'}/>
        <IconButton size={'small'}>
          <Add/>
        </IconButton>
      </Paper>

      <Grid className={'d-flex'} container sx={{mt: 1}} onMouseMove={resizeFrame} onMouseUp={stopResize}>
        <div style={{width: leftWidth, maxWidth: 600}}>
          <RecentRequests/>
        </div>
        <div style={{backgroundColor: 'green', height: 200, cursor: 'e-resize', width: 20}} onMouseDown={startResize}>

        </div>
        <div style={{width: rightWidth, minWidth: 500}}>
          <RequestSection/>
          <ResponseSection/>
        </div>
      </Grid>

    </Container>
  )
}
