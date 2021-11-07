import React, {useState} from "react";
import {Send} from "@mui/icons-material";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {LoadingButton} from "@mui/lab";
import {useCustomRequests} from "../../../../../Providers/Requests/CustomRequestsPorvider";

const RequestSend = ({project, customRequest, setCustomRequest}) => {
  const [request, setRequest] = useState(false);
  const {createCustomRequestsHistory} = useCustomRequests();

  const sendRequest = async () => {
    setRequest(true)

    let headers = {};
    for (let i = 0; i < customRequest?.requestHeaders?.length; i++) {
      const key = customRequest?.requestHeaders[i].key;
      const value = customRequest?.requestHeaders[i].value;
      if (customRequest?.requestHeaders[i].include && (key.length > 0 || value.length > 0)) {
        headers[key] = value;
      }
    }
    let options = {
      method: customRequest?.method,
      headers
    };

    if (!['GET', 'HEAD'].includes(customRequest?.method)) {
      options.body = customRequest?.requestBody
    }
    let response;

    await createCustomRequestsHistory(project.id, customRequest);

    try {
      response = await fetch(customRequest?.requestUrl, options);
    } catch (error) {
      setRequest(false);
      return;
    }


    const responseHeaders = Object.fromEntries(response.headers.entries());
    const responseBody = await response.text();
    setCustomRequest({...customRequest, responseHeaders, responseBody, statusCode: response.status})
    setRequest(false)
  }

  return (
    <LoadingButton
      sx={{ml: 2, pr: 2, pl: 2}}
      endIcon={<Send/>}
      onClick={sendRequest}
      loading={request}
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
  {
    setCustomRequest
  },
)(RequestSend);
