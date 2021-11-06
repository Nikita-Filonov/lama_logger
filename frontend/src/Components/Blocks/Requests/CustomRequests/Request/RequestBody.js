import React from "react";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import {useTheme} from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";


const RequestBody = ({customRequest, setCustomRequest}) => {
  const classes = CustomRequestsStyles();
  const {palette} = useTheme();

  const onEdit = async (requestBody) => setCustomRequest({...customRequest, requestBody})

  return (
    <div className={classes.requestHeadersContainer}>
      <AceEditor
        key={customRequest?.requestId}
        placeholder="Request body"
        mode={'json'}
        theme={palette.mode === 'dark' ? 'monokai' : 'github'}
        name="Request body"
        width={'100%'}
        height={'100%'}
        onChange={onEdit}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={customRequest?.requestBody}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false
        }}
      />
    </div>
  )
}

const getState = (state) => ({
  customRequest: state.customRequests.customRequest,
})

export default connect(
  getState,
  {
    setCustomRequest
  },
)(RequestBody);
