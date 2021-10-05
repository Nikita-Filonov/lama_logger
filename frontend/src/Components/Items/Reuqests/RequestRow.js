import React, {useMemo, useState} from "react";
import {connect} from "react-redux";
import {Checkbox, Collapse, TableCell, TableRow, Typography} from "@material-ui/core";
import {setRequest} from "../../../Redux/Requests/requestsActions";
import {StatusCodeIndicator} from "../../Blocks/Requests/StatusCodeIndicator";
import {useHistory} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {RequestsTableStyles} from "../../../Styles/Blocks";
import ViewRequestDemo from "../../Blocks/Requests/ViewReuqestDemo";

const RequestRow = ({request, project}) => {
  const classes = RequestsTableStyles()
  const history = useHistory();
  const [open, setOpen] = useState(false)

  const onSelect = () => {
    setOpen(!open)
    history.push(`?requestId=${request.request_id}&projectId=${project.id}`)
  }

  return (
    <React.Fragment>
      <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
        <TableCell padding="checkbox">
          <Checkbox
            size={'small'}
            color={'primary'}
          />
        </TableCell>
        <TableCell component="th" scope="row" onClick={onSelect}>
          {request.method}
        </TableCell>
        <TableCell align="left" onClick={onSelect}>
          <Typography
            style={{width: window.innerWidth / 2}}
            className={classes.rowRequestUrlText}
          >{request.request_url}</Typography>
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
            <ViewRequestDemo request={request}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  null,
)(RequestRow);
