import React, {useContext} from 'react';
import {baseUrl} from "../../Utils/Constants";
import {useUsers} from "../UsersProvider";


const RequestsSettingsContext = React.createContext(null);

const RequestsSettingsProvider = ({children}) => {
  const {token} = useUsers()
  const projectsApi = baseUrl + 'api/v1/projects/';


  return (
    <RequestsSettingsContext.Provider
      value={{}}
    >
      {children}
    </RequestsSettingsContext.Provider>
  );
};

const useRequestsSettings = () => {
  const event = useContext(RequestsSettingsContext);
  if (event == null) {
    throw new Error('useRequestsSettings() called outside of a RequestsSettingsProvider?');
  }
  return event;
};

export {RequestsSettingsProvider, useRequestsSettings};
