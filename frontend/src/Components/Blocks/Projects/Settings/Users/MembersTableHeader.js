import React, {useMemo} from "react";
import Box from "@mui/material/Box";
import {Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {visuallyHidden} from "@mui/utils";
import {connect} from "react-redux";
import {setSelectedMembers} from "../../../../../Redux/Projects/projectActions";

const headCells = [
  {
    id: 'user.username',
    align: 'left',
    label: 'Username',
  },
  {
    id: 'role.name',
    align: 'left',
    label: 'Role',
  },
];

const MembersTableHeader = (props) => {
  const {order, orderBy, onRequestSort, filteredMembers, selectedMembers, setSelectedMembers} = props;
  const numSelected = useMemo(() => selectedMembers.length, [selectedMembers])
  const rowCount = useMemo(() => filteredMembers.length, [filteredMembers])

  const onSelectAll = (event) => event.target.checked
    ? setSelectedMembers(filteredMembers.map(r => r.id))
    : setSelectedMembers([])

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

export const getState = (state) => ({
  selectedMembers: state.projects.selectedMembers,
})

export default connect(
  getState,
  {
    setSelectedMembers
  },
)(MembersTableHeader);
