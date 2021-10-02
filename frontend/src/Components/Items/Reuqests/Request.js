import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import {setRequest} from "../../../Redux/Requests/requestsActions";
import {StatusCodeIndicator} from "../../Blocks/Requests/StatusCodeIndicator";

const Request = ({item, request, setRequest}) => {

  const onSelect = () => setRequest(item)

  return (
    <ListItemButton onClick={onSelect} selected={request.id === item.id}>
      <Typography className={'me-2'}>{item.method}</Typography>
      <ListItemText
        primary={<a href={item.request_url} target={'_blank'} className={'text-decoration-none'}>
          {item.request_url}
        </a>}
      />
      <Typography>{item.response_code}</Typography>
      <StatusCodeIndicator statusCode={item.response_code}/>
    </ListItemButton>
  )
}

const getState = (state) => ({
  request: state.requests.request
})

export default connect(
  getState,
  {
    setRequest,
  },
)(Request);
