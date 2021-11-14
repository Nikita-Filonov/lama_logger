import React from "react";
import {List, Paper, Typography} from "@mui/material";
import {ChainedRequestAccordion} from "../../../../Items/Reuqests/Requests/ChainedRequestAccordion";
import {RequestsTableStyles} from "../../../../../Styles/Blocks";
import {connect} from "react-redux";
import RequestSectionMenu from "../../../../Menus/Requests/CustomRequests/RequestSectionMenu";
import {HeaderDivider} from "../../CustomRequests/HeaderDivider";

const RequestsList = ({requestsChain}) => {
  const classes = RequestsTableStyles();

  return (
    <Paper elevation={3} sx={{p: 1}}>
      <div className={'d-flex align-items-center'}>
        <Typography>Chained requests</Typography>
        <div className={'flex-grow-1'}/>
        <RequestSectionMenu/>
      </div>
      <HeaderDivider/>
      <List dense className={classes.nodeChainListContainer}>
        {requestsChain?.map((request, index) => <ChainedRequestAccordion key={index} request={request}/>)}
      </List>
    </Paper>
  )
}

const getState = (state) => ({
  requestsChain: state.requests.requestsChain
})

export default connect(
  getState,
  null,
)(RequestsList);
