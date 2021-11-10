import React, {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Button, Divider, ListItemIcon, Menu, Tooltip} from "@mui/material";
import {CustomRequestsStyles} from "../../../../../Styles/Screens";
import MenuItem from "@mui/material/MenuItem";
import {CUSTOM_METHODS} from "../../../../../Utils/Constants";
import {connect} from "react-redux";
import {setCustomRequest} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";
import {Add} from "@mui/icons-material";

const MethodSelect = ({customRequest, setCustomRequest}) => {
  const classes = CustomRequestsStyles();
  const [menu, setMenu] = useState(null);

  const onOpen = (event) => setMenu(event.currentTarget);
  const onClose = () => setMenu(null);

  const onSelectMethod = (method) => {
    setCustomRequest({...customRequest, method});
    onClose();
  }

  return (
    <React.Fragment>
      <Tooltip title={'Select method'}>
        <Button
          sx={{mr: 2}}
          variant={'outlined'}
          color={'inherit'}
          className={classes.methodButton}
          endIcon={<KeyboardArrowDownIcon/>}
          onClick={onOpen}
        >
          {customRequest?.method}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={onClose}
      >
        {CUSTOM_METHODS.map((method, index) =>
          <MenuItem
            value={method}
            key={index}
            sx={{maxWidth: 150, width: 150}}
            onClick={() => onSelectMethod(method)}
            selected={method === customRequest?.method}
          >
            {method}
          </MenuItem>
        )}
        <Divider/>
        <MenuItem>
          <ListItemIcon>
            <Add/>
          </ListItemIcon>
          New method
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

const getState = (state) => ({
  customRequest: state.customRequests.customRequest,
})

export default connect(
  getState,
  {
    setCustomRequest
  },
)(MethodSelect);
