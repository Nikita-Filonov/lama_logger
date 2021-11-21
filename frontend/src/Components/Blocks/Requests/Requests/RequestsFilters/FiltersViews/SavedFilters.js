import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useRequests} from "../../../../../../Providers/Requests/RequestsProvider";
import {Box, List} from "@mui/material";
import SavedFilter from "../../../../../Items/Reuqests/Requests/SavedFilter";
import {EmptyList} from "../../../../Common/EmptyList";

const SavedFilters = (props) => {
  const {project, savedRequestsFilters} = props;
  const {getRequestsFilters} = useRequests();

  useEffect(() => {
    (async () => await getRequestsFilters(project?.id))();
  }, [project?.id]);

  return (
    <React.Fragment>
      {savedRequestsFilters?.length === 0 && <Box sx={{mt: 5}}>
        <EmptyList
          text={'There is not saved filters'}
          description={'Click on "Save filters" to create new one'}
          withImage={false}
        />
      </Box>}
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
