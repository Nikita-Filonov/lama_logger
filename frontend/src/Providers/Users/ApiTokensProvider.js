import React, {useContext, useEffect, useState} from 'react';
import {baseUrl} from "../../Utils/Constants";
import {useAlerts} from "../AlertsProvider";
import {useUsers} from "./UsersProvider";


const ApiTokensContext = React.createContext(null);

const ApiTokensProvider = ({children}) => {
  const tokensApi = baseUrl + 'api/v1/user/tokens/';
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const [tokens, setTokens] = useState([]);
  const [request, setRequest] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    (async () => token && await getTokens())()
  }, [token])

  const getTokens = async () => {
    setLoad(true)
    await fetch(tokensApi, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async payload => {
        setTokens(payload)
        setLoad(false)
      });
  }

  const createToken = async (payload) => {
    setRequest(true)
    const response = await fetch(tokensApi, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      const payload = await response.json();
      setTokens([...tokens, payload]);
      setAlert({message: 'API Token was successfully created', level: 'success'})
    } else {
      setAlert({message: 'Error happened while creating token', level: 'error'})
    }
    setRequest(false)
  }

  return (
    <ApiTokensContext.Provider
      value={{
        load,
        request,
        tokens,
        createToken
      }}
    >
      {children}
    </ApiTokensContext.Provider>
  );
};

const useApiTokens = () => {
  const event = useContext(ApiTokensContext);
  if (event == null) {
    throw new Error('useApiTokens() called outside of a ApiTokensProvider?');
  }
  return event;
};

export {ApiTokensProvider, useApiTokens};
