import React, {useMemo} from "react";
import Box from "@mui/material/Box";
import {Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {visuallyHidden} from "@mui/utils";
import {connect} from "react-redux";
import {setSelectedRequests} from "../../../../Redux/Requests/requestsActions";

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

const RequestsTableHeader = (props) => {
  const {order, orderBy, onRequestSort, requests, selectedRequests, setSelectedRequests} = props;
  const numSelected = useMemo(() => selectedRequests.length, [selectedRequests])
  const rowCount = useMemo(() => requests?.results?.length, [requests?.results])

  const onSelectAll = (event) => event.target.checked
    ? setSelectedRequests(requests?.results?.map(r => r.request_id))
    : setSelectedRequests([])

  return (
    <TableHead>
      <TableRow>
        <TableCell padding={'checkbox'}>
          <Checkbox
            size={'small'}
            color={'primary'}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onClick={onSelectAll}
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
        <TableCell padding={'checkbox'}/>
      </TableRow>
    </TableHead>
  )
}

const getState = (state) => ({
  requests: state.requests.requests,
  selectedRequests: state.requests.selectedRequests
})

export default connect(
  getState,
  {
    setSelectedRequests,
  },
)(RequestsTableHeader);
