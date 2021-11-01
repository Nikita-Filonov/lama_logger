import React from "react";
import {connect} from "react-redux";
import {
  setRequestsFilters,
  setRequestsTimeFilterModal
} from "../../../../../../Redux/Requests/Requests/requestsActions";

const SavedFilters = (props) => {
  const {
    projectSettings,
    requestsFilters,
    setRequestsFilters,
    setRequestsTimeFilterModal
  } = props;

  return (
    <React.Fragment>

    </React.Fragment>
  )
}

const getState = (state) => ({
  projectSettings: state.projects.projectSettings,
  requestsFilters: state.requests.requestsFilters,
})

export default connect(
  getState,
  {
    setRequestsFilters,
    setRequestsTimeFilterModal
  },
)(SavedFilters);
