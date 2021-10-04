import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import {setRequest} from "../../../Redux/Requests/requestsActions";
import {StatusCodeIndicator} from "../../Blocks/Requests/StatusCodeIndicator";
import {useHistory} from "react-router-dom";

const Request = ({item, project, request, setRequest}) => {
  const history = useHistory();

  const onSelect = () => {
    setRequest(item)
    history.push(`?requestId=${item.request_id}&projectId=${project.id}`)
  }

  return (
    <ListItemButton onClick={onSelect} selected={request.request_id === item.request_id}>
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
  project: state.projects.project,
  request: state.requests.request
})

export default connect(
  getState,
  {
    setRequest,
  },
)(Request);
