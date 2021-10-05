import React, {useMemo} from "react";
import {Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {connect} from "react-redux";
import {setSelectAllRequests, setSelectedRequests} from "../../../../Redux/Requests/requestsActions";

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
  const {order, orderBy, onRequestSort, filteredRequests, selectedRequests, setSelectAllRequests} = props;
  const numSelected = useMemo(() => selectedRequests.length, [selectedRequests])
  const rowCount = useMemo(() => filteredRequests.length, [filteredRequests])

  const onSelectAll = (event) => event.target.checked
    ? setSelectAllRequests(filteredRequests.map(r => r.request_id))
    : setSelectAllRequests([])

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
  selectedRequests: state.requests.selectedRequests
})

export default connect(
  getState,
  {
    setSelectedRequests,
    setSelectAllRequests
  },
)(RequestsTableHeader);
