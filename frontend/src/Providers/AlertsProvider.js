import React, {useContext, useRef} from 'react';
import {IconButton} from "@mui/material";
import {SnackbarProvider} from "notistack";
import {Close} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {TRANSITIONS} from "../Utils/Constants";

const AlertsContext = React.createContext(null);

const AlertsProvider = ({children}) => {
  const alertRef = useRef(null);
  const theme = useSelector(state => state.users.theme);

  const setAlert = ({message, level}) =>
    (message && level) && alertRef.current.enqueueSnackbar(message, {variant: level});
  const onClose = (key) => alertRef.current.closeSnackbar(key);

  return (
    <AlertsContext.Provider
      value={{
        setAlert
      }}
    >
      <SnackbarProvider
        ref={alertRef}
        maxSnack={5}
        autoHideDuration={4000}
        anchorOrigin={{
          vertical: theme?.snackbar?.vertical || 'bottom',
          horizontal: theme?.snackbar?.horizontal || 'right',
        }}
        action={key => <IconButton onClick={() => onClose(key)}><Close/></IconButton>}
        TransitionComponent={TRANSITIONS[theme?.snackbar?.transition || 'slide']}
      >
        {children}
      </SnackbarProvider>
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
