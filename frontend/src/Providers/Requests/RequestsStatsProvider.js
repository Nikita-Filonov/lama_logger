import React, {useContext, useState} from 'react';
import {objectToQuery} from "../../Utils/Utils/Common";
import {get} from "../../Utils/Api/Fetch";


const RequestsStatsContext = React.createContext(null);

const RequestsStatsProvider = ({children}) => {
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(false);
  const [requestsStats, setRequestsStats] = useState({data: []});

  const getRequestsStats = async (projectId, groupBy = 'hours', filters = {}) => {
    setLoad(true);
    const query = await objectToQuery({...filters, groupBy});
    const {json} = await get(projectsApi + `${projectId}/requests/stats/${query}`);
    setRequestsStats(json);
    setLoad(false);
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
