import React, {useMemo} from "react";
import {Divider, IconButton, List, Pagination, Paper, Typography} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import {connect} from "react-redux";
import {HeaderDivider} from "../HeaderDivider";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import HistoryAccordion from "../../../../Items/Reuqests/CustomRequests/HistoryAccordion";
import {useCustomRequests} from "../../../../../Providers/Requests/CustomRequestsPorvider";
import {RequestsHistorySkeletons} from "./RequestsHistorySkeletons";
import {setCustomRequestsHistoryPagination} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {useWindowSize} from "../../../../../Utils/Hooks/LayoutHooks";
import _ from 'lodash';

const RequestsHistory = (props) => {
  const {
    customRequest,
    customRequestsHistory,
    customRequestsHistoryPagination,
    setCustomRequestsHistoryPagination
  } = props;
  const classes = CustomRequestsStyles();
  const {height} = useWindowSize();
  const {loadHistory} = useCustomRequests();

  const paginationCount = useMemo(() =>
      Math.floor(customRequestsHistory?.count / customRequestsHistoryPagination?.rowsPerPage),
    [customRequestsHistory.count]
  );

  const listHeight = useMemo(
    () => _.isEmpty(customRequest?.responseHeaders) ? height / 1.54 : height / 1.216,
    [customRequest?.responseHeaders]
  );

  const onChangePage = async (event, page) => setCustomRequestsHistoryPagination({
    ...customRequestsHistoryPagination,
    page
  });

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
      <List dense className={classes.historyListContainer} sx={{maxHeight: listHeight, height: listHeight}}>
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
      <Divider/>
      <div className={'d-flex justify-content-center'}>
        <Pagination sx={{mt: 1}} onChange={onChangePage} count={paginationCount} size="small"/>
      </div>
    </Paper>
  )
}

const getState = (state) => ({
  customRequest: state.customRequests.customRequest,
  customRequestsHistory: state.customRequests.customRequestsHistory,
  customRequestsHistoryPagination: state.customRequests.customRequestsHistoryPagination
})

export default connect(
  getState,
  {
    setCustomRequestsHistoryPagination
  },
)(RequestsHistory);
