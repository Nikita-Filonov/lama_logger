import React from "react";
import {Send} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

export const RequestSend = ({request, sendRequest}) =>
  <LoadingButton
    sx={{ml: 2, pr: 2, pl: 2}}
    endIcon={<Send/>}
    onClick={sendRequest}
    loading={request}
    loadingPosition="end"
  >
    Send
  </LoadingButton>
