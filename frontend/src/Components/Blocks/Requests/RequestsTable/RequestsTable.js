import React, {useState} from "react";
import {Paper, Table, TableBody, TableContainer, TablePagination, Typography} from "@mui/material";
import {getComparator, stableSort} from "../../../../Utils/Utils";
import {RequestsTableStyles} from "../../../../Styles/Blocks";
import RequestRow from "../../../Items/Reuqests/RequestRow";
import RequestsTableHeader from "./RequestsTableHeader";
import {connect} from "react-redux";
import {setRequestsPagination} from "../../../../Redux/Requests/requestsActions";


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
    localStorage.setItem('rowsPerPageRequests', event.target.value)
    setRequestsPagination({...requestsPagination, page: 0, rowsPerPage: parseInt(event.target.value, 10)})
  };
  const onPageChange = (e, page) => setRequestsPagination({...requestsPagination, page})

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
          />
          <TableBody>
            {stableSort(requests?.results, getComparator(order, orderBy))
              .map(r => <RequestRow request={r} key={r.request_id}/>)}
          </TableBody>

          <TablePagination
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
          />
        </Table>
      </TableContainer>
    </React.Fragment>
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
