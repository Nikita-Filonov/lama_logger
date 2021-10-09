import React, {useMemo, useState} from "react";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import {connect} from "react-redux";
import {getComparator, stableSort} from "../../../../../../Utils/Utils";
import {ProjectSettingsStyles} from "../../../../../../Styles/Screens";
import RoleRow from "../../../../../Items/Projects/Settings/Users/Roles/RoleRow";
import RolesTableHeader from "./RolesTableHeader";

const RolesTable = ({project}) => {
  const classes = ProjectSettingsStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const filteredRoles = useMemo(() => project.roles.filter(r => r), [project.roles])
  const onRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  return (
    <TableContainer component={Paper} className={classes.membersTableContainer}>
      <Table className={'w-100'} size={'small'} aria-label="a dense table" stickyHeader>
        <RolesTableHeader
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          filteredRoles={filteredRoles}
        />
        <TableBody>
          {stableSort(filteredRoles, getComparator(order, orderBy))
            .map(role => <RoleRow role={role} key={role.id}/>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


const getState = (state) => ({
  project: state.projects.project,
})

export default connect(
  getState,
  null,
)(RolesTable);
