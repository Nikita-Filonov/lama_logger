import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Constants";


const UsersContext = React.createContext(null);

const UsersProvider = ({children}) => {
  const usersApi = baseUrl + 'api/v1/user/';
  const [token, setToken] = useState(null);
  const [request, setRequest] = useState(false);
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    (async () => {

    })();
  }, [token]);

  const onLogin = async ({username, password}) => {
    await fetch(baseUrl + 'api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(response => response.json())
      .then(async data => {
        if (data?.token) {
          setToken(token);
          localStorage.setItem('token', data?.token)
        } else {
          setErrors(data)
        }
      });
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
        errors,
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
