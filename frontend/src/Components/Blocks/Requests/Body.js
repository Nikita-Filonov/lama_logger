import React from "react";
import {Typography} from "@mui/material";
import ReactJson from "react-json-view";
import {bodyTypeDetect} from "../../../Utils/Utils";

export const Body = ({body, responseHeaders}) => {
  switch (bodyTypeDetect(responseHeaders, body)) {
    case 'html':
      return <div dangerouslySetInnerHTML={{__html: body}}/>
    case 'json':
      return <ReactJson src={JSON.parse(body)}/>
    case 'text':
      return <div style={{backgroundColor: '#E0E0E0', padding: 10}}>
        <Typography>{body}</Typography>
      </div>
    default:
      return <div style={{backgroundColor: '#E0E0E0', padding: 10}}>
        <Typography>{body}</Typography>
      </div>
  }
}
