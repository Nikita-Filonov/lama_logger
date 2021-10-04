import React, {useMemo} from "react";
import Paper from "@mui/material/Paper";
import {CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {successesByStatusCode} from "../../../Utils/Utils";
import {connect} from "react-redux";
import {EmptyList} from "../../Other/EmptyList";
import {useRequests} from "../../../Providers/RequestsProvider";
import {comp} from "../../../Styles/Blocks";
import RequestRow from "../../Items/Reuqests/RequestRow";

const RequestsTable = ({requests, requestsFilters}) => {
  const {load} = useRequests()

  const filteredRequests = useMemo(
    () => requests.filter(r => requestsFilters.methods.includes(r.method) &&
      successesByStatusCode(r.response_code, requestsFilters.successes)),
    [requests, requestsFilters]
  )

  return (
    <div>
      {load && <CircularProgress style={comp.spinner}/>}
      {filteredRequests.length === 0 && !load && <EmptyList text={'No requests here'}/>}
      {filteredRequests.length > 0 && <TableContainer component={Paper} style={{
        maxHeight: window.innerHeight / 1.3
      }}>
        <Table sx={{minWidth: 650}} size="small" aria-label="a dense table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Method</TableCell>
              <TableCell align="left">Url</TableCell>
              <TableCell align="right">Status code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map(r => <RequestRow item={r} key={r.request_id}/>)}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  )
}

const getState = (state) => ({
  requests: state.requests.requests,
  requestsFilters: state.requests.requestsFilters,
})

export default connect(
  getState,
  null,
)(RequestsTable);
