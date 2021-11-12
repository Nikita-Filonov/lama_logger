import React, {useMemo} from "react";
import Box from "@mui/material/Box";
import {Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {visuallyHidden} from "@mui/utils";
import {connect} from "react-redux";
import {setSelectedRoles} from "../../../../../../Redux/Requests/Settings/requestsSettingsActions";

const headCells = [
  {
    id: 'name',
    align: 'left',
    label: 'Name',
  },
  {
    id: 'scopesCount',
    align: 'left',
    label: 'Scopes',
  },
];

const RolesTableHeader = (props) => {
  const {order, orderBy, onRequestSort, filteredRoles, selectedRoles, setSelectedRoles} = props;
  const numSelected = useMemo(() => selectedRoles.length, [selectedRoles])
  const rowCount = useMemo(() => filteredRoles.length, [filteredRoles])

  const onSelectAll = (event) => event.target.checked
    ? setSelectedRoles(filteredRoles.map(r => r.id))
    : setSelectedRoles([])

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
              disabled={!headCell.id}
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
  selectedRoles: state.requestsSettings.selectedRoles,
})

export default connect(
  getState,
  {
    setSelectedRoles
  },
)(RolesTableHeader);
