import React from "react";
import {connect} from "react-redux";
import {Divider, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {Close} from "@material-ui/icons";
import {setRequest} from "../../../Redux/Requests/requestsActions";
import {styled} from '@mui/material/styles';
import {Paper} from "@material-ui/core";
import {Headers} from "./Headers";


const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const ViewRequest = ({request, setRequest}) => {
  const onClose = () => setRequest({})

  return (
    <div>
      <div className={'d-flex'}>
        <div className={'flex-grow-1'}/>
        <Tooltip title={'Close request'}>
          <IconButton onClick={onClose}>
            <Close/>
          </IconButton>
        </Tooltip>
      </div>
      <Stack spacing={1}>
        <Typography variant={'body2'}>Url</Typography>
        <Item>{request.request_url}</Item>
      </Stack>
      <Typography variant={'body2'} className={'mt-2 mb-2'}>Request headers</Typography>
      <Headers headers={request.request_headers}/>
      <Divider className={'mt-3 mb-3'}/>
      <Typography variant={'body2'} className={'mt-2 mb-2'}>Response headers</Typography>
      <Headers headers={request.response_headers}/>
    </div>
  )
}


const getState = (state) => ({
  request: state.requests.request
})

export default connect(
  getState,
  {
    setRequest
  },
)(ViewRequest);
