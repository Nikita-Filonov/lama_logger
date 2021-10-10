import React, {useContext, useState} from 'react';
import {baseUrl} from "../Utils/Constants";
import {useUsers} from "./UsersProvider";
import {DELETE_REQUESTS, SET_REQUEST, SET_REQUESTS} from "../Redux/Requests/actionTypes";
import {useAlerts} from "./AlertsProvider";
import {copyText, objectToQuery} from "../Utils/Utils";


const RequestsContext = React.createContext(null);

const RequestsProvider = ({children, store}) => {
  const {token} = useUsers()
  const {setAlert} = useAlerts()
  const projectsApi = baseUrl + 'api/v1/projects/';
  const [load, setLoad] = useState(false);


  const getRequests = async (projectId, limit = null, offset = null, other = {}) => {
    setLoad(true)
    const queryPayload = {
      ...other,
      limit: limit || localStorage.getItem('rowsPerPageRequests'),
      offset: offset || 0
    }
    const query = await objectToQuery(queryPayload);
    await fetch(projectsApi + `${projectId}/requests/${query}`, {
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

  const getRequest = async (projectId, requestId) => {
    await fetch(projectsApi + `${projectId}/requests/${requestId}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => store.dispatch({type: SET_REQUEST, payload: data}));
  }

  const getRequestAsCurl = async (projectId, requestId) => {
    await fetch(projectsApi + `${projectId}/requests/${requestId}/curl/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        copyText(data.curl)
        setAlert({message: 'Request copied to clipboard'})
      });
  }

  const deleteRequests = async (projectId, requests) => {
    store.dispatch({type: DELETE_REQUESTS, payload: requests})
    await fetch(projectsApi + `${projectId}/requests/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requests)
    })
  }

  return (
    <RequestsContext.Provider
      value={{
        load,
        getRequest,
        getRequests,
        getRequestAsCurl,
        deleteRequests
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
