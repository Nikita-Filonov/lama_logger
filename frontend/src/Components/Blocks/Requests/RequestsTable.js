import React, {useMemo, useState} from "react";
import Paper from "@mui/material/Paper";
import {
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import {successesByStatusCode} from "../../../Utils/Utils";
import {connect} from "react-redux";
import {EmptyList} from "../../Other/EmptyList";
import {useRequests} from "../../../Providers/RequestsProvider";
import {comp} from "../../../Styles/Blocks";
import RequestRow from "../../Items/Reuqests/RequestRow";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'method',
    align: 'left',
    label: 'Method',
  },
  {
    id: 'request_url',
    align: 'left',
    label: 'Url',
  },
  {
    id: 'response_code',
    align: 'right',
    label: 'Status code',
  },
];

const RequestsTable = ({requests, requestsFilters}) => {
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
    <div>
      {load && <CircularProgress style={comp.spinner}/>}
      {filteredRequests.length === 0 && !load && <EmptyList text={'No requests here'}/>}
      {filteredRequests.length > 0 && <TableContainer component={Paper} style={{
        maxHeight: window.innerHeight / 1.3
      }}>
        <Table sx={{minWidth: 650}} size="small" aria-label="a dense table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding={'checkbox'}>
                <Checkbox
                  size={'small'}
                  color={'primary'}
                />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={onRequestSort(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(filteredRequests, getComparator(order, orderBy))
              .map(r => <RequestRow item={r} key={r.request_id}/>)}
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
