import * as React from 'react';
import {useEffect, useMemo} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {SlideTransition} from "../../../../Utils/Utils/Common";
import {connect} from "react-redux";
import {setRequestsNodeChainModal} from "../../../../Redux/Requests/Requests/requestsActions";
import {AppBar, Container, Dialog, Grid, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import NodeChainRequestsList from "../../../Blocks/Requests/Requests/NodeChain/NodeChainRequestsList";
import NodeChainRequestSection from "../../../Blocks/Requests/Requests/NodeChain/NodeChainRequestSection";
import {useHistory} from "react-router-dom";
import {useRequests} from "../../../../Providers/Requests/RequestsProvider";


const NodeChain = (props) => {
  const {requestsNodeChainModal, setRequestsNodeChainModal, project, requestsChain} = props;
  const history = useHistory();
  const {getRequestsChain} = useRequests();

  const onClose = () => setRequestsNodeChainModal(false);
  const title = useMemo(() => requestsChain.length > 0 ? requestsChain[0]?.node : 'Unknown', [requestsChain]);
  const totalDuration = useMemo(
    () => requestsChain.length > 0
      ? requestsChain?.reduce((prev, cur) => ({duration: prev.duration + cur.duration}))
      : 0,
    [requestsChain]
  );

  useEffect(() => {
    (async () => {
      const queryParams = new URLSearchParams(history.location.search)
      if (queryParams.get('nodeChainModal') && queryParams.has('nodeId')) {
        await getRequestsChain(project?.id, queryParams.get('nodeId'));
        setRequestsNodeChainModal(true);
      }
    })()
  }, [])

  useEffect(() => {
    const queryParams = new URLSearchParams(history.location.search)

    if (requestsNodeChainModal) {
      queryParams.set('nodeChainModal', true);
      queryParams.set('nodeId', requestsChain[0]?.nodeId);
    } else {
      queryParams.delete('nodeChainModal');
      queryParams.delete('nodeId');
    }

    history.replace({search: queryParams.toString()});
  }, [requestsNodeChainModal])

  return (
    <Dialog
      fullScreen
      open={requestsNodeChainModal}
      onClose={onClose}
      TransitionComponent={SlideTransition}
    >
      <AppBar sx={{position: 'relative'}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon/>
          </IconButton>
          <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
            Node: {title}
          </Typography>
          <Tooltip title={'Run this node'} arrow placement={'left'}>
            <IconButton>
              <PlayArrowOutlinedIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'xl'}>
        {/*<Paper elevation={3} sx={{p: 2, mt: 2, display: 'flex', alignItems: 'center'}}>*/}
        {/*  <Typography>Total requests: {requestsChain?.length}</Typography>*/}
        {/*  <Typography sx={{ml: 3}}>*/}
        {/*    <AccessTime sx={{mr: 1}} fontSize={'small'}/>*/}
        {/*    Total duration: {getDuration(totalDuration?.duration)} milliseconds*/}
        {/*  </Typography>*/}
        {/*</Paper>*/}

        <Grid container spacing={2} sx={{mt: 0.1}}>
          <Grid item xs={6}>
            <NodeChainRequestsList/>
          </Grid>
          <Grid item xs={6}>
            <NodeChainRequestSection/>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

const getState = (state) => ({
  project: state.projects.project,
  requestsChain: state.requests.requestsChain,
  requestsNodeChainModal: state.requests.requestsNodeChainModal
})

export default connect(
  getState,
  {
    setRequestsNodeChainModal
  },
)(NodeChain);
