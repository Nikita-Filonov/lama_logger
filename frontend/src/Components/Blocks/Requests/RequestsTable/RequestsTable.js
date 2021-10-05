import React, {useMemo, useState} from "react";
import Paper from "@mui/material/Paper";
import {CircularProgress, Table, TableBody, TableContainer} from "@material-ui/core";
import {getComparator, stableSort, successesByStatusCode} from "../../../../Utils/Utils";
import {connect} from "react-redux";
import {EmptyList} from "../../../Other/EmptyList";
import {useRequests} from "../../../../Providers/RequestsProvider";
import {comp, RequestsTableStyles} from "../../../../Styles/Blocks";
import RequestRow from "../../../Items/Reuqests/RequestRow";
import RequestsTableHeader from "./RequestsTableHeader";


const RequestsTable = ({requests, requestsFilters}) => {
  const classes = RequestsTableStyles()
  const {load} = useRequests()
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const filteredRequests = useMemo(
    () => requests.filter(r => requestsFilters.methods.includes(r.method) &&
      successesByStatusCode(r.response_code, requestsFilters.successes)),
    [requests, requestsFilters]
  )
  const onRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={'mt-3'}>
      {load && <CircularProgress style={comp.spinner}/>}
      {filteredRequests.length === 0 && !load && <EmptyList text={'No requests here'}/>}
      {filteredRequests.length > 0 && <TableContainer component={Paper} className={classes.tableContainer}>
        <Table sx={{minWidth: 650}} size="small" aria-label="a dense table" stickyHeader>
          <RequestsTableHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            filteredRequests={filteredRequests}
          />
          <TableBody>
            {stableSort(filteredRequests, getComparator(order, orderBy))
              .map(r => <RequestRow request={r} key={r.request_id}/>)}
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
