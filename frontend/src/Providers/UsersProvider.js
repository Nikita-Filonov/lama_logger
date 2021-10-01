import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Constants";


const UsersContext = React.createContext(null);

const UsersProvider = ({children}) => {
  const usersApi = baseUrl + 'api/v1/user/';
  const [token, setToken] = useState(null);
  const [request, setRequest] = useState(false);
  const [user, setUser] = useState({})

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
      .then(async data => setUser(data));
  }, [token]);


  return (
    <UsersContext.Provider
      value={{
        user,
        token,
        request,
        onLogin,
        onLogout,
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
