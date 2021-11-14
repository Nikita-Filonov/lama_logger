import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {SlideTransition} from "../../../../Utils/Utils/Common";
import {connect} from "react-redux";
import {setRequestsNodeChainModal} from "../../../../Redux/Requests/Requests/requestsActions";
import {Container, Dialog, Grid} from "@mui/material";
import NodeChainRequestsList from "../../../Blocks/Requests/Requests/NodeChain/NodeChainRequestsList";
import NodeChainRequestSection from "../../../Blocks/Requests/Requests/NodeChain/NodeChainRequestSection";
import {useHistory} from "react-router-dom";
import {useRequests} from "../../../../Providers/Requests/RequestsProvider";
import NodeChainModalHeader from "../../../Blocks/Requests/Requests/NodeChain/NodeChainModalHeader";


const NodeChain = (props) => {
  const {requestsNodeChainModal, setRequestsNodeChainModal, project, requestsChain, requestChain} = props;
  const history = useHistory();
  const {getRequestsChain} = useRequests();

  const onClose = () => setRequestsNodeChainModal(false);

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
  }, [requestsNodeChainModal]);

  useEffect(() => {
    const timeout = setTimeout(async () => (project.id && requestChain?.requestId) && {},
      700
    );
    return () => clearTimeout(timeout);
  }, [project.id, requestChain])

  return (
    <Dialog
      fullScreen
      open={requestsNodeChainModal}
      onClose={onClose}
      TransitionComponent={SlideTransition}
    >
      <NodeChainModalHeader/>
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
  requestChain: state.requests.requestChain,
  requestsChain: state.requests.requestsChain,
  requestsNodeChainModal: state.requests.requestsNodeChainModal
})

export default connect(
  getState,
  {
    setRequestsNodeChainModal
  },
)(NodeChain);
