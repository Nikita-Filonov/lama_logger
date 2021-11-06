import React, {useContext, useEffect} from 'react';
import {get} from "../../Utils/Api/Fetch";
import {useUsers} from "./UsersProvider";
import {SET_USER_SETTINGS} from "../../Redux/Users/actionTypes";
import {useAlerts} from "../AlertsProvider";


const UserSettingsContext = React.createContext(null);

const UserSettingsProvider = ({children, store}) => {
  const userSettingsApi = 'api/v1/user/settings/';
  const {token} = useUsers();
  const {setAlert} = useAlerts();

  useEffect(() => {
    (async () => token && await getUserSettings())()
  }, [token])

  const getUserSettings = async () => {
    const {json, error} = await get(userSettingsApi);
    store.dispatch({type: SET_USER_SETTINGS, payload: json});
    error && setAlert({message: 'Unable to fetch user settings', level: 'error'});
  }

  const updateUserSettings = async (settingsId, payload) => {

  }

  return (
    <UserSettingsContext.Provider
      value={{updateUserSettings}}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

const useUserSettings = () => {
  const event = useContext(UserSettingsContext);
  if (event == null) {
    throw new Error('useUserSettings() called outside of a UserSettingsProvider?');
  }
  return event;
};

export {UserSettingsProvider, useUserSettings};
