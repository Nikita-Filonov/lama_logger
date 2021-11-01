import React, {memo} from "react";
import {ListItem, ListItemSecondaryAction, ListItemText, Tooltip} from "@mui/material";
import {common} from "../../../../Styles/Blocks";
import SavedFilterMenu from "../../../Menus/Requests/Requests/SavedFilterMenu";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../Redux/Requests/Requests/requestsActions";
import {useAlerts} from "../../../../Providers/AlertsProvider";

const SavedFilter = ({filter, setRequestsFilters, requestsFilters}) => {
  const {setAlert} = useAlerts();

  const onSelect = () => {
    setRequestsFilters(filter);
    setAlert({message: 'Filters selected', level: 'success'});
  }

  return (
    <Tooltip title={filter?.title} placement={'right'}>
      <ListItem
        divider
        button
        disableGutters
        onClick={onSelect} selected={requestsFilters?.id === filter?.id}
      >
        <ListItemText
          primary={filter?.title}
          style={{...common.ellipsisText, width: 100, maxWidth: 100, marginLeft: 3}}
        />
        <ListItemSecondaryAction>
          <SavedFilterMenu/>
        </ListItemSecondaryAction>
      </ListItem>
    </Tooltip>
  )
}

const getState = (state) => ({
  requestsFilters: state.requests.requestsFilters,
})

export default connect(
  getState,
  {
    setRequestsFilters
  },
)(memo(SavedFilter));
