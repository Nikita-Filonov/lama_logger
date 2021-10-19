import React, {useMemo} from "react";
import {Typography, useTheme} from "@mui/material";
import ReactJson from "react-json-view";
import {bodyTypeDetect} from "../../../../../Utils/Utils/Formatters";

export const Body = ({body, responseHeaders}) => {
  const {palette} = useTheme();
  const backgroundText = useMemo(() => palette.mode === 'dark' ? '#4F4F4F' : '#E0E0E0', [palette.mode]);
  const backgroundJson = useMemo(() => palette.mode === 'dark' ? '#353535' : '#FFFFFF', [palette.mode]);

  switch (bodyTypeDetect(responseHeaders, body)) {
    case 'html': {
      return <div style={{backgroundColor: backgroundText, padding: 10}}>
        <iframe srcDoc={JSON.parse(body)} width={'100%'} height={300}/>
      </div>
    }
    case 'json':
      return <ReactJson
        style={{backgroundColor: backgroundJson}}
        theme={palette.mode === 'dark' ? 'railscasts' : 'rjv-default'}
        src={JSON.parse(body)}
      />
    case 'text':
      return <div style={{backgroundColor: backgroundText, padding: 10}}>
        <Typography>{body}</Typography>
      </div>
    default:
      return <div style={{backgroundColor: backgroundText, padding: 10}}>
        <Typography>{body}</Typography>
      </div>
  }
}
