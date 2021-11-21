import React, {useState} from "react";
import {Paper, Table, TableBody, TableContainer, TablePagination, Typography} from "@mui/material";
import {RequestsTableStyles} from "../../../../../Styles/Blocks";
import RequestRow from "../../../../Items/Reuqests/Requests/RequestRow";
import RequestsTableHeader from "./RequestsTableHeader";
import {connect} from "react-redux";
import {setRequestsPagination} from "../../../../../Redux/Requests/Requests/requestsActions";
import {getComparator, stableSort} from "../../../../../Utils/Utils/Sorting";
import {REQUESTS_PAGINATION} from "../../../../../Utils/Constants";
import {EmptyList} from "../../../Common/EmptyList";


const RequestsTable = (props) => {
  const {requests, requestsPagination, setRequestsPagination} = props;
  const classes = RequestsTableStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('method');

  const onRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem(REQUESTS_PAGINATION, event.target.value)
    setRequestsPagination({...requestsPagination, page: 0, rowsPerPage: parseInt(event.target.value, 10)})
  };
  const onPageChange = (e, page) => setRequestsPagination({...requestsPagination, page})

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      {requests?.results?.length === 0 && <EmptyList
        text={'There is no requests'}
        description={'When your autotests/application will start sending requests they will appear here'}
      />}
      <Table className={'w-100'} size={'small'} aria-label="a dense table" stickyHeader>
        {requests?.results?.length > 0 && <RequestsTableHeader
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
        />}
        <TableBody>
          {
            stableSort(requests?.results, getComparator(order, orderBy))
              .map(request => <RequestRow request={request} key={request.requestId}/>)
          }
        </TableBody>

        {requests?.results?.length > 0 && <TablePagination
          size={'small'}
          rowsPerPageOptions={[25, 50, 100]}
          colSpan={6}
          count={requests.count}
          rowsPerPage={requestsPagination.rowsPerPage}
          page={requestsPagination.page}
          labelRowsPerPage={<Typography variant={'body2'} sx={{marginTop: 2}}>Requests per page</Typography>}
          labelDisplayedRows={({count, from, page, to}) =>
            <Typography variant={'body2'} sx={{marginTop: 2}}>{from}-{to} of {count}</Typography>
          }
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={onPageChange}
        />}
      </Table>
    </TableContainer>
  )
}

const getState = (state) => ({
  requests: state.requests.requests,
  requestsPagination: state.requests.requestsPagination
})

export default connect(
  getState,
  {
    setRequestsPagination
  },
)(RequestsTable);
