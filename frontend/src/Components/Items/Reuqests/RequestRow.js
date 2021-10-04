import React from "react";
import {connect} from "react-redux";
import {TableCell, TableRow, Typography} from "@material-ui/core";
import {setRequest} from "../../../Redux/Requests/requestsActions";
import {StatusCodeIndicator} from "../../Blocks/Requests/StatusCodeIndicator";
import {useHistory} from "react-router-dom";

const RequestRow = ({item, project, request, setRequest}) => {
  const history = useHistory();

  const onSelect = () => {
    setRequest(item)
    history.push(`?requestId=${item.request_id}&projectId=${project.id}`)
  }

  return (
    <TableRow
      onClick={onSelect}
      selected={item.request_id === request.request_id}
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
      <TableCell component="th" scope="row">
        {item.method}
      </TableCell>
      <TableCell align="left">{item.request_url}</TableCell>
      <TableCell align="right" style={{display: 'flex'}}>
        <StatusCodeIndicator statusCode={item.response_code}/>
        <Typography>{item.response_code}</Typography>
      </TableCell>
    </TableRow>
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
)(RequestRow);
