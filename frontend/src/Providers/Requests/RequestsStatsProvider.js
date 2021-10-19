import React, {useContext, useState} from 'react';
import {baseUrl} from "../../Utils/Constants";
import {useUsers} from "../Users/UsersProvider";
import {objectToQuery} from "../../Utils/Utils/Common";


const RequestsStatsContext = React.createContext(null);

const RequestsStatsProvider = ({children}) => {
  const {token} = useUsers()
  const projectsApi = baseUrl + 'api/v1/projects/';
  const [load, setLoad] = useState(false);
  const [requestsStats, setRequestsStats] = useState({});

  const getRequestsStats = async (projectId, groupBy = 'hours', filters = {}) => {
    setLoad(true)
    const query = await objectToQuery({...filters, groupBy});
    await fetch(projectsApi + `${projectId}/requests/stats/${query}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        setRequestsStats(data)
        setLoad(false);
      });
  }

  return (
    <RequestsStatsContext.Provider
      value={{
        load,
        requestsStats,
        getRequestsStats,
      }}
    >
      {children}
    </RequestsStatsContext.Provider>
  );
};

const useRequestsStats = () => {
  const event = useContext(RequestsStatsContext);
  if (event == null) {
    throw new Error('useRequestsStats() called outside of a RequestsStatsProvider?');
  }
  return event;
};

export {RequestsStatsProvider, useRequestsStats};
