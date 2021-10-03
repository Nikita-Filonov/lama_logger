import React, {useContext, useState} from 'react';
import {Slide, Snackbar} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import {Close} from "@material-ui/icons";

const AlertsContext = React.createContext(null);

const SlideTransition = (props) => <Slide {...props} direction="up"/>;


const AlertsProvider = ({children}) => {
  const [alert, setAlert] = useState({})

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({});
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <Close fontSize="small"/>
      </IconButton>
    </React.Fragment>
  );

  return (
    <AlertsContext.Provider
      value={{
        setAlert
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={4000}
        open={alert?.message}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        message={alert.message}
        key={SlideTransition.name}
        action={action}
      />
    </AlertsContext.Provider>
  );
};

const useAlerts = () => {
  const event = useContext(AlertsContext);
  if (event == null) {
    throw new Error('useAlerts() called outside of a AlertsProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {AlertsProvider, useAlerts};
