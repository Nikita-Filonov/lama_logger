import React from "react";
import {IconButton, List, Paper, Typography} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import {connect} from "react-redux";
import {HeaderDivider} from "../HeaderDivider";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import {HistoryAccordion} from "../../../../Items/Reuqests/CustomRequests/HistoryAccordion";
import {useCustomRequests} from "../../../../../Providers/Requests/CustomRequestsPorvider";
import {RequestsHistorySkeletons} from "./RequestsHistorySkeletons";

const RequestsHistory = ({customRequestsHistory}) => {
  const classes = CustomRequestsStyles();
  const {loadHistory} = useCustomRequests();

  return (
    <Paper elevation={3} sx={{p: 1, pl: 1.5}}>
      <div className={'d-flex align-items-center'}>
        <Typography>History</Typography>
        <div className={'flex-grow-1'}/>
        <IconButton size={'small'}>
          <MoreVert fontSize={'small'}/>
        </IconButton>
      </div>
      <HeaderDivider/>
      <List dense className={classes.historyListContainer}>
        {loadHistory
          ? <RequestsHistorySkeletons/>
          : customRequestsHistory?.results?.map((history, index) =>
            <HistoryAccordion
              key={index}
              history={history}
            />
          )
        }
      </List>
    </Paper>
  )
}

const getState = (state) => ({
  customRequestsHistory: state.customRequests.customRequestsHistory,
})

export default connect(
  getState,
  null,
)(RequestsHistory);
