import React, {memo} from "react";
import {ListItem, ListItemSecondaryAction, ListItemText, Tooltip} from "@mui/material";
import {common} from "../../../../Styles/Blocks";
import SavedFilterMenu from "../../../Menus/Requests/Requests/SavedFilterMenu";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../Redux/Requests/Requests/requestsActions";
import {useAlerts} from "../../../../Providers/AlertsProvider";
import {DEFAULT_REQUESTS_FILTERS} from "../../../../Utils/Constants";

const SavedFilter = ({filter, setRequestsFilters, requestsFilters}) => {
  const {setAlert} = useAlerts();

  const onSelect = () => {
    if (filter?.id === requestsFilters?.id) {
      setRequestsFilters(DEFAULT_REQUESTS_FILTERS);
      setAlert({message: 'Default filters selected', level: 'success'});
      setAlert({message: `Filters "${filter?.title}" deselected`, level: 'success'});
    } else {
      setRequestsFilters(filter);
      setAlert({message: 'Filters selected', level: 'success'});
    }
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
          <SavedFilterMenu filter={filter} onSelectFilters={onSelect}/>
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
