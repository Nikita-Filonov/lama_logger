import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {SlideTransition} from "../../../../Utils/Utils/Common";
import {connect} from "react-redux";
import {setRequestChain, setRequestsNodeChainModal} from "../../../../Redux/Requests/Requests/requestsActions";
import {Container, Dialog, Grid} from "@mui/material";
import NodeChainRequestsList from "../../../Blocks/Requests/Requests/NodeChain/NodeChainRequestsList";
import NodeChainRequestSection from "../../../Blocks/Requests/Requests/NodeChain/NodeChainRequestSection";
import {useHistory} from "react-router-dom";
import {useRequests} from "../../../../Providers/Requests/RequestsProvider";
import NodeChainModalHeader from "../../../Blocks/Requests/Requests/NodeChain/NodeChainModalHeader";
import _ from 'lodash';


const NodeChain = (props) => {
  const {
    requestsNodeChainModal,
    setRequestsNodeChainModal,
    project,
    requestsChain,
    requestChain,
  } = props;
  const history = useHistory();
  const {getRequestsChain, updateRequest} = useRequests();

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
    const timeout = setTimeout(async () => {
        (project?.id && requestChain?.requestId) && await updateRequest(project?.id, requestChain?.requestId, requestChain);
      }, 700
    );
    return () => clearTimeout(timeout);
  }, [project.id, requestChain])

  return (
    <Dialog
      fullScreen
      open={requestsNodeChainModal}
      TransitionComponent={SlideTransition}
    >
      <NodeChainModalHeader/>
      <Container maxWidth={'xl'}>
        <Grid container spacing={2} sx={{mt: 0.1}}>
          <Grid item xs={_.isEmpty(requestChain) ? 12 : 6}>
            <NodeChainRequestsList/>
          </Grid>
          {!_.isEmpty(requestChain) && <Grid item xs={6}>
            <NodeChainRequestSection/>
          </Grid>}
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
    setRequestChain,
    setRequestsNodeChainModal
  },
)(NodeChain);
