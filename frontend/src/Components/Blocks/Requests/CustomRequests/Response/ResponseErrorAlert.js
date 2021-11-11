import React from "react";
import {Alert} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {connect} from "react-redux";
import {setCustomRequestError} from "../../../../../Redux/Requests/CustomRequests/customRequestsActions";

const ResponseErrorAlert = ({customRequestError, setCustomRequestError}) => {

  const onClose = () => setCustomRequestError({...customRequestError, data: null});

  return (
    <Box sx={{width: '100%'}}>
      <Alert
        variant={'outlined'}
        severity={customRequestError?.level || 'error'}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit"/>
          </IconButton>
        }
        sx={{mb: 2}}
      >
        {customRequestError?.data}
      </Alert>
    </Box>
  )
}

const getState = (state) => ({
  customRequestError: state.customRequests.customRequestError,
})

export default connect(
  getState,
  {
    setCustomRequestError
  },
)(ResponseErrorAlert);
