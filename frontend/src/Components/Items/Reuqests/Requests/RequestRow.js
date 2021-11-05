import React, {memo, useEffect, useMemo, useRef, useState} from "react";
import {connect} from "react-redux";
import {Checkbox, Collapse, TableCell, TableRow, Typography} from '@mui/material';
import {StatusCodeIndicator} from "../../../Blocks/Requests/Requests/StatusCodeIndicator";
import {useHistory} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {RequestsTableStyles} from "../../../../Styles/Blocks";
import ViewRequestAccordion from "../../../Blocks/Requests/Requests/ViewRequest/ViewRequestAccordion";
import {setRequest, setSelectedRequests} from "../../../../Redux/Requests/Requests/requestsActions";
import {METHOD_COLORS} from "../../../../Utils/Constants";

const RequestRow = (props) => {
  const {request, requests, storeRequest, setRequest, viewMode, selectedRequests, setSelectedRequests} = props;
  const classes = RequestsTableStyles()
  const rowRef = useRef(null)
  const history = useHistory();
  const [open, setOpen] = useState(false)

  const isSelected = useMemo(
    () => selectedRequests.indexOf(request.requestId) !== -1,
    [selectedRequests]
  );

  const onSelect = () => {
    viewMode.requests === 'accordion' && setOpen(!open);
    setRequest(request);
    history.push(`?requestId=${request.requestId}`);
  }

  useEffect(() => {
    if (requests?.length === 0) {
      return
    }

    const query = new URLSearchParams(history.location.search);
    const requestId = query.get('requestId');
    if (requestId && requestId === request.requestId) {
      viewMode.requests === 'accordion' && setOpen(true);
      rowRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [])

  return (
    <React.Fragment>
      <TableRow
        sx={{'&:last-child td, &:last-child th': {border: 0}}}
        ref={rowRef}
        selected={isSelected || request?.requestId === storeRequest?.requestId}
      >
        <TableCell padding="checkbox">
          <Checkbox
            size={'small'}
            color={'primary'}
            checked={isSelected}
            onClick={() => setSelectedRequests({isSelected, requestId: request?.requestId})}
          />
        </TableCell>
        <TableCell component="th" scope="row" onClick={onSelect}>
          <Typography color={METHOD_COLORS[request?.method]} variant={'body2'}>
            {request.method}
          </Typography>
        </TableCell>
        <TableCell align="left" onClick={onSelect} sx={{maxWidth: 200}} className={classes.rowRequestUrlText}>
          <Typography className={classes.rowRequestUrlText}>{request?.requestUrl}</Typography>
        </TableCell>
        <TableCell align="right" className={'d-flex'} onClick={onSelect}>
          <StatusCodeIndicator statusCode={request?.statusCode}/>
          <Typography>{request?.statusCode}</Typography>
        </TableCell>
        {viewMode?.requests === 'accordion' && <TableCell padding="checkbox">
          <IconButton size="small" onClick={onSelect}>
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>}
      </TableRow>

      {viewMode?.requests === 'accordion' && <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ViewRequestAccordion request={request}/>
          </Collapse>
        </TableCell>
      </TableRow>}
    </React.Fragment>
  )
}

const getState = (state) => ({
  viewMode: state.users.viewMode,
  requests: state.requests.requests,
  storeRequest: state.requests.request,
  selectedRequests: state.requests.selectedRequests
})

export default connect(
  getState,
  {
    setRequest,
    setSelectedRequests
  },
)(memo(RequestRow));
