import React from "react";
import {TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";

const headCells = [
  {
    id: 'title',
    align: 'left',
    label: 'Title',
  },
  {
    id: 'requestsCount',
    align: 'left',
    label: 'Requests',
  },
  {
    id: 'membersCount',
    align: 'left',
    label: 'Members',
  },
];

export const ProjectsTableHeader = (props) => {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
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
        <TableCell padding="checkbox"/>
      </TableRow>
    </TableHead>
  );
}
