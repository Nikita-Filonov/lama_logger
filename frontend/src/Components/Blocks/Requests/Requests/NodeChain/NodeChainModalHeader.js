import React, {useMemo, useState} from "react";
import {AppBar, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {HelpOutline} from "@mui/icons-material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import {NodeChainReference} from "../../../../Modals/Requests/Requests/NodeChainReference";
import {connect} from "react-redux";
import {setRequestChain, setRequestsNodeChainModal} from "../../../../../Redux/Requests/Requests/requestsActions";
import RunNodeChain from "../../../../Modals/Requests/Requests/RunNodeChain";

const NodeChainModalHeader = (props) => {
  const {requestsChain, setRequestsNodeChainModal, setRequestChain} = props;
  const [nodeChainRefModal, setNodeChainRefModal] = useState(!localStorage.getItem('nodeChainRefModal'));
  const [runNodeChainModal, setRunNodeChainModal] = useState(false);

  const onClose = () => {
    setRequestsNodeChainModal(false);
    setRequestChain({});
  };
  const onRef = () => setNodeChainRefModal(true);
  const onRun = () => setRunNodeChainModal(true);
  const title = useMemo(() => requestsChain.length > 0 ? requestsChain[0]?.node : 'Unknown', [requestsChain]);

  return (
    <React.Fragment>
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
          <Tooltip title={'Reference'} arrow placement={'bottom'}>
            <IconButton sx={{mr: 2}} onClick={onRef}>
              <HelpOutline/>
            </IconButton>
          </Tooltip>
          <Tooltip title={'Launch this node'} arrow placement={'bottom-end'}>
            <IconButton onClick={onRun}>
              <PlayArrowOutlinedIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <RunNodeChain modal={runNodeChainModal} setModal={setRunNodeChainModal}/>
      <NodeChainReference modal={nodeChainRefModal} setModal={setNodeChainRefModal}/>
    </React.Fragment>
  )
}

const getState = (state) => ({
  requestsChain: state.requests.requestsChain,
})

export default connect(
  getState,
  {
    setRequestChain,
    setRequestsNodeChainModal
  },
)(NodeChainModalHeader);
