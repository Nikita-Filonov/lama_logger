import React, {useMemo, useState} from "react";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import {connect} from "react-redux";
import MembersTableHeader from "./MembersTableHeader";
import {getComparator, stableSort} from "../../../../../Utils/Utils";
import MemberRow from "../../../../Items/Projects/Settings/Users/MemberRow";

const MembersTable = ({project}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const filteredMembers = useMemo(() => project.members.filter(m => m), [project.members])
  const onRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  return (
    <TableContainer component={Paper}>
      <Table className={'w-100'} size={'small'} aria-label="a dense table" stickyHeader>
        <MembersTableHeader
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          filteredMembers={filteredMembers}
        />
        <TableBody>
          {stableSort(filteredMembers, getComparator(order, orderBy))
            .map(m => <MemberRow member={m} key={m.id}/>)}
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
)(MembersTable);
