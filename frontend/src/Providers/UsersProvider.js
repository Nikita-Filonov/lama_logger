import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Constants";
import {SET_USER} from "../Redux/Users/actionTypes";
import {useAlerts} from "./AlertsProvider";
import {setRequest} from "../Redux/Requests/Requests/requestsActions";


const UsersContext = React.createContext(null);

const UsersProvider = ({children, store}) => {
  const usersApi = baseUrl + 'api/v1/user/';
  const {setAlert} = useAlerts();
  const [request, setRequest] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const storageToken = localStorage.getItem('token')
      setToken(storageToken)

      token && await getUser()
    })();
  }, [token]);

  const onLogin = async (token) => {
    setToken(token);
    localStorage.setItem('token', token)
  };

  const onLogout = async () => {
    setToken(null);
    localStorage.removeItem('token')
  };

  const getUser = useCallback(async () => {
    await fetch(usersApi, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async payload => store.dispatch({type: SET_USER, payload}));
  }, [token]);

  const updateUser = async (payload) => {
    setRequest(true)
    const response = await fetch(usersApi, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      store.dispatch({type: SET_USER, payload});
      setAlert({message: 'Your profile successfully updated', level: 'success'});
    } else {
      setAlert({message: 'Error happened while updating profile', level: 'error'});
    }
    setRequest(false);
  }

  return (
    <UsersContext.Provider
      value={{
        token,
        request,
        onLogin,
        onLogout,
        updateUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

const useUsers = () => {
  const event = useContext(UsersContext);
  if (event == null) {
    throw new Error('useUsers() called outside of a AuthProvider?');
  }
  return event;
};

export {UsersProvider, useUsers};
