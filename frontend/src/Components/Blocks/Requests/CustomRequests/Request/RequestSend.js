import React from "react";
import {Send} from "@mui/icons-material";
import {connect} from "react-redux";
import {LoadingButton} from "@mui/lab";
import {useCustomRequests} from "../../../../../Providers/Requests/CustomRequestsPorvider";

const RequestSend = ({project, customRequest}) => {
  const {request, sendCustomRequest, createCustomRequestsHistory} = useCustomRequests();

  const sendRequest = async () => {
    await sendCustomRequest(project.id, customRequest.requestId)
    await createCustomRequestsHistory(project.id, customRequest);
  }

  return (
    <LoadingButton
      sx={{ml: 2, pr: 2, pl: 2}}
      endIcon={<Send/>}
      onClick={sendRequest}
      loading={request}
      loadingPosition="end"
    >
      Send
    </LoadingButton>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  customRequest: state.customRequests.customRequest,
})

export default connect(
  getState,
  null,
)(RequestSend);
