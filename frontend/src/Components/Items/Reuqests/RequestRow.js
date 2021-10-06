import React, {useEffect, useMemo, useRef, useState} from "react";
import {connect} from "react-redux";
import {Checkbox, Collapse, TableCell, TableRow, Typography} from "@material-ui/core";
import {StatusCodeIndicator} from "../../Blocks/Requests/StatusCodeIndicator";
import {useHistory} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {RequestsTableStyles} from "../../../Styles/Blocks";
import ViewRequest from "../../Blocks/Requests/ViewRequest/ViewReuqest";
import {setSelectedRequests} from "../../../Redux/Requests/requestsActions";

const RequestRow = ({request, requests, selectedRequests, setSelectedRequests}) => {
  const classes = RequestsTableStyles()
  const rowRef = useRef(null)
  const history = useHistory();
  const [open, setOpen] = useState(false)

  const isSelected = useMemo(
    () => selectedRequests.indexOf(request.request_id) !== -1,
    [selectedRequests]
  );

  const onSelect = () => {
    setOpen(!open)
    history.push(`?requestId=${request.request_id}`)
  }

  useEffect(() => {
    if (requests?.length === 0) {
      return
    }

    const query = new URLSearchParams(history.location.search);
    const requestId = query.get('requestId');
    if (requestId && requestId === request.request_id) {
      setOpen(true);
      rowRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [])

  return (
    <React.Fragment>
      <TableRow
        sx={{'&:last-child td, &:last-child th': {border: 0}}}
        ref={rowRef}
        selected={isSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            size={'small'}
            color={'primary'}
            checked={isSelected}
            onClick={() => setSelectedRequests({isSelected, requestId: request.request_id})}
          />
        </TableCell>
        <TableCell component="th" scope="row" onClick={onSelect}>
          {request.method}
        </TableCell>
        <TableCell align="left" onClick={onSelect}>
          <Typography className={classes.rowRequestUrlText}>{request.request_url}</Typography>
        </TableCell>
        <TableCell align="right" className={'d-flex'} onClick={onSelect}>
          <StatusCodeIndicator statusCode={request.response_code}/>
          <Typography>{request.response_code}</Typography>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={onSelect}>
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ViewRequest request={request}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const getState = (state) => ({
  requests: state.requests.requests,
  selectedRequests: state.requests.selectedRequests
})

export default connect(
  getState,
  {
    setSelectedRequests
  },
)(RequestRow);
