import React, {useContext, useState} from 'react';
import {Slide} from "@material-ui/core";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AlertsContext = React.createContext(null);

const SlideTransition = (props) => <Slide {...props} direction="up"/>;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const AlertsProvider = ({children}) => {
  const [alert, setAlert] = useState({})

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({});
  };


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
        open={Boolean(alert?.message)}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        key={SlideTransition.name}
      >
        <Alert onClose={onClose} severity={alert?.level || 'success'} sx={{width: '100%'}}>
          {alert?.message}
        </Alert>
      </Snackbar>
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
