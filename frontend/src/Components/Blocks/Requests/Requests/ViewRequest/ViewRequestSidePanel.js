import React, {memo} from "react";
import {Divider, IconButton, Paper, Tooltip} from "@mui/material";
import ViewRequestAccordion from "./ViewRequestAccordion";
import ViewRequestMenu from "../../../../Menus/Requests/Requests/ViewRequestMenu";
import {Close} from "@mui/icons-material";
import {connect} from "react-redux";
import {setRequest} from "../../../../../Redux/Requests/Requests/requestsActions";

const ViewRequestSidePanel = ({request, setRequest}) => {
  const onClose = () => setRequest({});

  return (
    <Paper sx={{ml: 2}}>
      <div className={'d-flex align-items-center p-2'}>
        <Tooltip title={'Close request'}>
          <IconButton size={'small'} onClick={onClose}>
            <Close fontSize={'small'}/>
          </IconButton>
        </Tooltip>
        <div className={'flex-grow-1'}/>
        <ViewRequestMenu request={request}/>
      </div>
      <Divider/>
      <ViewRequestAccordion request={request}/>
    </Paper>
  )
}

const getState = (state) => ({
  request: state.requests.request,
})

export default connect(
  getState,
  {
    setRequest,
  },
)(memo(ViewRequestSidePanel));
