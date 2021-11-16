import * as React from 'react';
import {useEffect, useState} from 'react';
import {SlideTransition} from "../../../../Utils/Utils/Common";
import {connect} from "react-redux";
import {setRequestChain, setRequestsNodeChainModal} from "../../../../Redux/Requests/Requests/requestsActions";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useRequests} from "../../../../Providers/Requests/RequestsProvider";
import {useAlerts} from "../../../../Providers/AlertsProvider";
import {setConfirmAction} from "../../../../Redux/Users/usersActions";
import List from "@mui/material/List";
import {LoadingButton} from "@mui/lab";
import {RunNodeChainRequest} from "../../../Items/Reuqests/Requests/RunNodeChainRequest";


const RunNodeChain = ({modal, setModal, project, requestsChain}) => {
  const {setAlert} = useAlerts();
  const [request, setRequest] = useState(false);
  const {sendRequest} = useRequests();
  const [selectedRequests, setSelectedRequests] = useState([]);

  useEffect(() => setSelectedRequests(requestsChain?.map(r => r.requestId)), [requestsChain.length]);

  const onClose = () => setModal(false);

  const onRunNode = async () => {
    setRequest(true);
    for (let index = 0; index < requestsChain?.length; index++) {
      const requestId = requestsChain[index]?.requestId;
      selectedRequests.includes(requestId) && await sendRequest(project?.id, requestId, true);
    }
    setAlert({message: `Successfully run ${requestsChain?.length} requests`, level: 'success'});
    setRequest(false);
    onClose();
  }

  const onSelect = async (requestId, isSelected) =>
    isSelected
      ? setSelectedRequests(selectedRequests.filter(r => r !== requestId))
      : setSelectedRequests([...selectedRequests, requestId]);


  return (
    <Dialog open={modal} TransitionComponent={SlideTransition} onClose={onClose} fullWidth>
      <DialogTitle>Run node</DialogTitle>
      <DialogContent>
        <Alert severity={'info'}>Responses might be changed</Alert>
        <DialogContentText sx={{mt: 2}}>
          Select requests
        </DialogContentText>
        <List dense>
          {requestsChain.map((request) =>
            <RunNodeChainRequest
              key={request.requestId}
              request={request}
              onSelect={onSelect}
              selectedRequests={selectedRequests}
            />
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton loading={request} onClick={onRunNode}>Run</LoadingButton>
      </DialogActions>
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
    setConfirmAction,
    setRequestsNodeChainModal
  },
)(RunNodeChain);
