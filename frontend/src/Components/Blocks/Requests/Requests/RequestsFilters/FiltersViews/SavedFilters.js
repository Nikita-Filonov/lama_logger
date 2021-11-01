import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useRequests} from "../../../../../../Providers/Requests/RequestsProvider";
import {List} from "@mui/material";
import SavedFilter from "../../../../../Items/Reuqests/Requests/SavedFilter";

const SavedFilters = (props) => {
  const {project, savedRequestsFilters} = props;
  const {getRequestsFilters} = useRequests();

  useEffect(() => {
    (async () => await getRequestsFilters(project.id))()
  }, [project])


  return (
    <React.Fragment>
      <List dense>
        {savedRequestsFilters?.map(filter => <SavedFilter key={filter.id} filter={filter}/>)}
      </List>
    </React.Fragment>
  )
}

const getState = (state) => ({
  project: state.projects.project,
  savedRequestsFilters: state.requests.savedRequestsFilters,
})

export default connect(
  getState,
  null,
)(SavedFilters);
