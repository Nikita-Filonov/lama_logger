import React from "react";
import {Checkbox, IconButton, TextField} from "@mui/material";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {Close} from "@mui/icons-material";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";

const RequestHeaders = ({customRequest}) => {
  const classes = CustomRequestsStyles();

  return (
    <div className={classes.requestHeadersContainer}>
      {Object.keys(customRequest?.requestHeaders)?.map((header, index) =>
        <div className={'d-flex align-items-center'} key={index}>
          <Checkbox size={'small'}/>
          <TextField
            sx={{mr: 2}}
            value={header}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Key'}
          />
          <TextField
            value={customRequest?.requestHeaders[header]}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Value'}
          />
          <IconButton size={'small'} sx={{mr: 1}}>
            <Close fontSize={'small'}/>
          </IconButton>
        </div>
      )}
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
)(RequestHeaders);
