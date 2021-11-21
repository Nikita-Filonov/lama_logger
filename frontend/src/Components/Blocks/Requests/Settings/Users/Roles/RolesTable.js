import React, {useMemo, useState} from "react";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import {connect} from "react-redux";
import {ProjectSettingsStyles} from "../../../../../../Styles/Screens";
import RoleRow from "../../../../../Items/Reuqests/Settings/Users/Roles/RoleRow";
import RolesTableHeader from "./RolesTableHeader";
import {getComparator, stableSort} from "../../../../../../Utils/Utils/Sorting";
import {EmptyList} from "../../../../Common/EmptyList";

const RolesTable = ({project, search}) => {
  const classes = ProjectSettingsStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const roles = useMemo(() => project.roles.filter(r => r), [project.roles]);
  const filteredRoles = useMemo(
    () => roles.filter(r => r?.name?.toLowerCase().includes(search?.toLowerCase())),
    [roles, search]
  )
  const onRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} className={classes.membersTableContainer}>
      {filteredRoles.length === 0 && <EmptyList text={'There is no roles based on your search'}/>}
      <Table className={'w-100'} size={'small'} aria-label="a dense table" stickyHeader>
        {filteredRoles.length > 0 && <RolesTableHeader
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          filteredRoles={filteredRoles}
        />}
        <TableBody>
          {stableSort(filteredRoles, getComparator(order, orderBy))
            .map(role => <RoleRow role={role} key={role.id}/>)
          }
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
