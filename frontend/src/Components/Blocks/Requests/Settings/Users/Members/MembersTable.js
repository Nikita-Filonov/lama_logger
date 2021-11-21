import React, {useMemo, useState} from "react";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import {connect} from "react-redux";
import MembersTableHeader from "./MembersTableHeader";
import MemberRow from "../../../../../Items/Reuqests/Settings/Users/Members/MemberRow";
import {ProjectSettingsStyles} from "../../../../../../Styles/Screens";
import {getComparator, stableSort} from "../../../../../../Utils/Utils/Sorting";
import {EmptyList} from "../../../../Common/EmptyList";

const MembersTable = ({project, search}) => {
  const classes = ProjectSettingsStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const members = useMemo(() => project.members.filter(m => m), [project.members]);
  const filteredMembers = useMemo(
    () => members.filter(m =>
      m?.user?.username?.toLowerCase().includes(search?.toLowerCase()) ||
      m?.user?.email?.toLowerCase().includes(search?.toLowerCase())
    ),
    [members, search]
  )
  const onRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} className={classes.membersTableContainer}>
      {filteredMembers.length === 0 && <EmptyList text={'There is no members based on your search'}/>}
      <Table className={'w-100'} size={'small'} aria-label="a dense table" stickyHeader>
        {filteredMembers.length > 0 && <MembersTableHeader
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          filteredMembers={filteredMembers}
        />}
        <TableBody>
          {stableSort(filteredMembers, getComparator(order, orderBy))
            .map(member => <MemberRow member={member} key={member.id}/>)
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}


const getState = (state) => (
  {
    project: state.projects.project,
  }
)

export default connect(
  getState,
  null,
)(MembersTable);
