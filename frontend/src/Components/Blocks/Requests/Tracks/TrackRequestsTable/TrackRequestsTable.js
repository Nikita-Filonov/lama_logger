import React, {useState} from "react";
import {Paper, Table, TableBody, TableContainer, TablePagination, Typography} from "@mui/material";
import {RequestsTableStyles} from "../../../../../Styles/Blocks";
import RequestRow from "../../../../Items/Reuqests/Requests/RequestRow";
import {connect} from "react-redux";
import {getComparator, stableSort} from "../../../../../Utils/Utils/Sorting";
import {TRACK_REQUESTS_PAGINATION} from "../../../../../Utils/Constants";
import {setTrackRequestsPagination} from "../../../../../Redux/Requests/Tracks/tracksActions";
import TrackRequestsTableHeader from "./TrackRequestsTableHeader";


const TrackRequestsTable = (props) => {
  const {trackRequests, trackRequestsPagination, setTrackRequestsPagination} = props;
  const classes = RequestsTableStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('method');

  const onRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem(TRACK_REQUESTS_PAGINATION, event.target.value)
    setTrackRequestsPagination({...trackRequestsPagination, page: 0, rowsPerPage: parseInt(event.target.value, 10)})
  };
  const onPageChange = (e, page) => setTrackRequestsPagination({...trackRequestsPagination, page})

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={'w-100'} size={'small'} aria-label="a dense table" stickyHeader>
        <TrackRequestsTableHeader
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
        />
        <TableBody>
          {
            stableSort(trackRequests?.results, getComparator(order, orderBy))
              .map(request => <RequestRow request={request} key={request.requestId}/>)
          }
        </TableBody>

        {trackRequests?.results?.length > 0 && <TablePagination
          size={'small'}
          rowsPerPageOptions={[25, 50, 100]}
          colSpan={6}
          count={trackRequests.count}
          rowsPerPage={trackRequestsPagination.rowsPerPage}
          page={trackRequestsPagination.page}
          labelRowsPerPage={<Typography variant={'body2'} sx={{mt: 2}}>Requests per page</Typography>}
          labelDisplayedRows={({count, from, page, to}) =>
            <Typography variant={'body2'} sx={{mt: 2}}>{from}-{to} of {count}</Typography>
          }
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={onPageChange}
        />}
      </Table>
    </TableContainer>
  )
}

const getState = (state) => ({
  trackRequests: state.tracks.trackRequests,
  trackRequestsPagination: state.tracks.trackRequestsPagination
})

export default connect(
  getState,
  {
    setTrackRequestsPagination
  },
)(TrackRequestsTable);
