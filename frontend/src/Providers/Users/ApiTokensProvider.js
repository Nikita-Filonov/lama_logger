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

  const createToken = async () => {
    setRequest(true)
    await fetch(tokensApi, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async payload => {
        setTokens([...tokens, payload])
        setRequest(false)
      });
  }

  return (
    <ApiTokensContext.Provider
      value={{
        load,
        request,
        tokens
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
