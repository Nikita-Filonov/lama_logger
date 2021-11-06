import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl} from "../../Utils/Constants";


const UserSettingsContext = React.createContext(null);

const UserSettingsProvider = ({children}) => {
  const [settings, setSettings] = useState({skeletonAnimation: 'wave'})

  const getUserSettings = async () => {

  }

  return (
    <UserSettingsContext.Provider
      value={{settings}}
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
