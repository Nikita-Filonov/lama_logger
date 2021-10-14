import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Constants";


const SettingsContext = React.createContext(null);

const SettingsProvider = ({children}) => {
  const [settings, setSettings] = useState({skeletonAnimation: 'wave'})


  return (
    <SettingsContext.Provider
      value={{settings}}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const event = useContext(SettingsContext);
  if (event == null) {
    throw new Error('useSettings() called outside of a SettingsProvider?');
  }
  return event;
};

export {SettingsProvider, useSettings};
