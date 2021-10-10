import React, {useEffect, useMemo, useState} from "react";
import {Paper, Table, TableBody, TableContainer, TablePagination, Typography} from "@mui/material";
import {getComparator, stableSort, successesByStatusCode} from "../../../../Utils/Utils";
import {RequestsTableStyles} from "../../../../Styles/Blocks";
import RequestRow from "../../../Items/Reuqests/RequestRow";
import RequestsTableHeader from "./RequestsTableHeader";
import {connect} from "react-redux";
import {useRequests} from "../../../../Providers/RequestsProvider";
import {useUsers} from "../../../../Providers/UsersProvider";


const RequestsTable = (props) => {
  const {project, requests, requestsFilters} = props;
  const classes = RequestsTableStyles();
  const {token} = useUsers();
  const {getRequests} = useRequests();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('method');
  const [rowsPerPage, setRowsPerPage] = useState(localStorage.getItem('rowsPerPageRequests') || 25);

  useEffect(() => {
    (async () => token && await getRequests(project.id, rowsPerPage, rowsPerPage * page))()
  }, [token, page, rowsPerPage])

  const filteredRequests = useMemo(
    () => requests?.results.filter(r => requestsFilters.methods.includes(r.method) &&
      successesByStatusCode(r.response_code, requestsFilters.successes)),
    [requests, requestsFilters]
  )
  const onRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem('rowsPerPageRequests', event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      {/*{load && <CircularProgress style={comp.spinner}/>}*/}
      {/*{filteredRequests.length === 0 && !load && <EmptyList text={'No requests here'}/>}*/}
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={'w-100'} size={'small'} aria-label="a dense table" stickyHeader>
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

          <TablePagination
            size={'small'}
            rowsPerPageOptions={[25, 50, 100]}
            colSpan={6}
            count={requests.count}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage={<Typography variant={'body2'} sx={{marginTop: 2}}>Requests per page</Typography>}
            labelDisplayedRows={({count, from, page, to}) =>
              <Typography variant={'body2'} sx={{marginTop: 2}}>{from}-{to} of {count}</Typography>
            }
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={(e, newPage) => setPage(newPage)}
          />
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  requests: state.requests.requests,
  requestsFilters: state.requests.requestsFilters
})

export default connect(
  getState,
  null,
)(RequestsTable);
