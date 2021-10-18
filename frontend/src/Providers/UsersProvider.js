import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Constants";
import {SET_USER} from "../Redux/Users/actionTypes";


const UsersContext = React.createContext(null);

const UsersProvider = ({children, store}) => {
  const usersApi = baseUrl + 'api/v1/user/';
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


  return (
    <UsersContext.Provider
      value={{
        token,
        onLogin,
        onLogout
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
