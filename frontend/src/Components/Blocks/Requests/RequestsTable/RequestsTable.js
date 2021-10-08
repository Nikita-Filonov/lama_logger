import React, {useMemo, useState} from "react";
import Paper from "@mui/material/Paper";
import {Table, TableBody, TableContainer} from "@material-ui/core";
import {getComparator, stableSort, successesByStatusCode} from "../../../../Utils/Utils";
import {RequestsTableStyles} from "../../../../Styles/Blocks";
import RequestRow from "../../../Items/Reuqests/RequestRow";
import RequestsTableHeader from "./RequestsTableHeader";
import {connect} from "react-redux";


const RequestsTable = ({requests, requestsFilters}) => {
  const classes = RequestsTableStyles();
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
    <React.Fragment>
      {/*{load && <CircularProgress style={comp.spinner}/>}*/}
      {/*{filteredRequests.length === 0 && !load && <EmptyList text={'No requests here'}/>}*/}
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={'w-100'} size="small" aria-label="a dense table" stickyHeader>
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
      </TableContainer>
    </React.Fragment>
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
