import React from "react";
import {TextField} from "@mui/material";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import {useSelector} from "react-redux";


export const ResponseHeaders = () => {
  const classes = CustomRequestsStyles();

  const responseHeaders = useSelector(state => state.customRequests.customRequest.responseHeaders);

  return (
    <div className={classes.responseHeadersContainer}>
      {responseHeaders?.map(({key, value}, index) =>
        <div className={'d-flex align-items-center mt-2'} key={index}>
          <TextField
            contentEditable={false}
            sx={{mr: 2}}
            value={key}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Key'}
          />
          <TextField
            contentEditable={false}
            value={value}
            fullWidth
            variant={'standard'}
            size={'small'}
            placeholder={'Value'}
          />
        </div>
      )}
    </div>
  )
}
