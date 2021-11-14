import * as React from 'react';
import {useMemo} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {SlideTransition} from "../../../../Utils/Utils/Common";
import {connect} from "react-redux";
import {setRequestsNodeChainModal} from "../../../../Redux/Requests/Requests/requestsActions";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Button,
  Chip,
  Container,
  Dialog,
  Divider,
  IconButton,
  List,
  Paper,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {METHOD_COLORS} from "../../../../Utils/Constants";
import Box from "@mui/material/Box";
import {getStatusCodeColor} from "../../../../Utils/Utils/Formatters";
import {RequestsTableStyles} from "../../../../Styles/Blocks";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

const NodeChain = ({requestsNodeChainModal, setRequestsNodeChainModal, requestsChain}) => {
  const classes = RequestsTableStyles();

  const onClose = () => setRequestsNodeChainModal(false);
  const title = useMemo(() => requestsChain.length > 0 ? requestsChain[0]?.node : 'Unknown', [requestsChain]);

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
          <Button autoFocus color="inherit" onClick={onClose}>
            save
          </Button>
          <Tooltip title={'Run this node'} arrow placement={'left'}>
            <IconButton>
              <PlayArrowOutlinedIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth={'xl'}>
        <Paper elevation={3} sx={{p: 2, mt: 2}}>
          <Typography>Total requests: {requestsChain?.length}</Typography>
        </Paper>
        <List dense className={classes.nodeChainListContainer}>
          {requestsChain?.map((request, index) =>
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color={METHOD_COLORS[request?.method]}>{request?.method}</Typography>
                <Typography sx={{ml: 2}}>{request?.requestUrl}</Typography>
                <Box sx={{flexGrow: 1}}/>
                <Chip
                  size={'small'}
                  sx={{backgroundColor: getStatusCodeColor(request?.statusCode), mr: 2}}
                  label={request?.statusCode}
                />
              </AccordionSummary>
              <Divider/>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </List>
      </Container>
    </Dialog>
  );
}

const getState = (state) => ({
  requestsChain: state.requests.requestsChain,
  requestsNodeChainModal: state.requests.requestsNodeChainModal
})

export default connect(
  getState,
  {
    setRequestsNodeChainModal
  },
)(NodeChain);
