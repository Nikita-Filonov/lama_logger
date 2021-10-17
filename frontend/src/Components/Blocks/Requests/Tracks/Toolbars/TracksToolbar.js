import React, {useState} from "react";
import {ViewRequestStyles} from "../../../../../Styles/Blocks";
import clsx from "clsx";
import RequestsMenu from "../../../../Menus/Requests/Requests/RequestsMenu";
import {Paper} from "@mui/material";
import {connect} from "react-redux";
import {setRequestsRealtime, setRequestsTimeFilterModal} from "../../../../../Redux/Requests/Requests/requestsActions";
import {Search} from "../../../Common/Search";
import ProjectSelect from "../../Requests/Toolbars/ProjectSelect";


const TracksToolbar = (props) => {
  const {setRequestsTimeFilterModal, requestsFilters, requestsRealtime, setRequestsRealtime} = props;
  const classes = ViewRequestStyles();
  const [search, setSearch] = useState('')

  return (
    <Paper
      elevation={3}
      className={clsx('mt-3 d-flex', classes.toolbarContainer)}
    >
      <ProjectSelect/>

      <div className={'flex-grow-1'}/>
      <Search
        search={search}
        setSearch={setSearch}
        placeholder={'Search by url, code, method'}
      />
      <RequestsMenu/>
    </Paper>
  )
}

const getState = (state) => ({
  requestsFilters: state.requests.requestsFilters,
  requestsRealtime: state.requests.requestsRealtime,
})

export default connect(
  getState,
  {
    setRequestsRealtime,
    setRequestsTimeFilterModal
  },
)(TracksToolbar);
