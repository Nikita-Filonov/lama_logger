import React, {useMemo} from "react";
import {connect} from "react-redux";
import {Checkbox, TableCell, TableRow, Typography} from "@material-ui/core";
import {setRequest} from "../../../Redux/Requests/requestsActions";
import {StatusCodeIndicator} from "../../Blocks/Requests/StatusCodeIndicator";
import {useHistory} from "react-router-dom";

const RequestRow = ({item, project, request, setRequest}) => {
  const history = useHistory();
  const isRequestSelected = useMemo(() => Boolean(request?.request_url),
    [request?.id, request?.request_url])

  const onSelect = () => {
    setRequest(item)
    history.push(`?requestId=${item.request_id}&projectId=${project.id}`)
  }

  return (
    <TableRow
      selected={item.request_id === request.request_id}
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
      <TableCell padding="checkbox">
        <Checkbox
          size={'small'}
          color={'primary'}
        />
      </TableCell>
      <TableCell component="th" scope="row" onClick={onSelect}>
        {item.method}
      </TableCell>
      <TableCell align="left" onClick={onSelect}>
        <Typography style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: window.innerWidth / (isRequestSelected ? 4.5 : 2)
        }}>{item.request_url}</Typography>
      </TableCell>
      <TableCell align="right" className={'d-flex'} onClick={onSelect}>
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
