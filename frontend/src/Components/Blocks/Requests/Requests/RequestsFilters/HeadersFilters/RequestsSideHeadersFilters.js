import React, {useState} from "react";
import {connect} from "react-redux";
import {setRequestsFilters} from "../../../../../../Redux/Requests/Requests/requestsActions";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography
} from "@mui/material";
import {Add, Close} from "@mui/icons-material";
import HeadersPopover from "./HeadersPopover";
import {common} from "../../../../../../Styles/Blocks";

const RequestsSideHeadersFilters = ({requestsFilters, setRequestsFilters}) => {
  const [headersMenu, setHeadersMenu] = useState(null);

  const onRemoveHeader = (index) => {
    const copyHeaders = [...requestsFilters?.headers];
    copyHeaders.splice(index, 1);
    setRequestsFilters({...requestsFilters, headers: [...copyHeaders]});
  }

  const onCloseMenu = () => setHeadersMenu(null);
  const onOpenMenu = (event) => setHeadersMenu(event.currentTarget);

  return (
    <React.Fragment>
      <Typography variant={'subtitle2'} className={'mt-2'}>Headers</Typography>
      <List dense>
        {requestsFilters?.headers
          .sort((a, b) => a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0))
          .map((header, index) =>
            <ListItem divider disableGutters key={header.id}>
              <ListItemText
                style={{...common.ellipsisText, maxWidth: 90}}
                primary={Object.keys(header)[0] ? Object.keys(header)[0] : '<Empty>'}
              />
              <ListItemSecondaryAction>
                <Tooltip title={'Remove filter'} placement={'right'}>
                  <IconButton size={'small'} onClick={() => onRemoveHeader(index)}>
                    <Close fontSize={'small'}/>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          )}
      </List>
      <Button
        size={'small'}
        fullWidth
        startIcon={<Add/>}
        className={'justify-content-start mt-1'}
        color={'inherit'}
        onClick={onOpenMenu}
      >
        New filter
      </Button>
      <HeadersPopover menu={headersMenu} onClose={onCloseMenu}/>
    </React.Fragment>
  )
}

const getState = (state) => ({
    requestsFilters: state.requests.requestsFilters,
  }
)

export default connect(
  getState,
  {
    setRequestsFilters,
  },
)(RequestsSideHeadersFilters);
