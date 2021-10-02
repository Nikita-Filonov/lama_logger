import React, {useContext, useState} from 'react';
import {baseUrl} from "../Utils/Constants";
import {useUsers} from "./UsersProvider";
import {SET_REQUESTS} from "../Redux/Requests/actionTypes";


const RequestsContext = React.createContext(null);

const RequestsProvider = ({children, store}) => {
  const {token} = useUsers()
  const projectsApi = baseUrl + 'api/v1/projects/';
  const [load, setLoad] = useState(null);


  const getRequests = async (projectId) => {
    setLoad(true)
    await fetch(projectsApi + `${projectId}/requests/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        store.dispatch({type: SET_REQUESTS, payload: data});
        setLoad(false);
      });
  }


  return (
    <RequestsContext.Provider
      value={{
        getRequests
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

const useRequests = () => {
  const event = useContext(RequestsContext);
  if (event == null) {
    throw new Error('useRequests() called outside of a ProjectsProvider?');
  }
  return event;
};

export {RequestsProvider, useRequests};
