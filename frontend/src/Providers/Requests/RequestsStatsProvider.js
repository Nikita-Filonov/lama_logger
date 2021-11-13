import React, {useContext, useEffect, useState} from 'react';
import {objectToQuery} from "../../Utils/Utils/Common";
import {get} from "../../Utils/Api/Fetch";
import {makeRequestsStatsFilters} from "../../Utils/Utils/Filters";
import {useSelector} from "react-redux";
import {SET_RATIO_STATUS_CODES} from "../../Redux/Requests/Stats/actionTypes";


const RequestsStatsContext = React.createContext(null);

const RequestsStatsProvider = ({children, store}) => {
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState({commonStats: true, ratioStatusCodes: true});
  const [requestsStats, setRequestsStats] = useState({data: []});

  const project = useSelector(state => state.projects.project);
  const statsFilters = useSelector(state => state.stats.statsFilters);
  const statsGroupBy = useSelector(state => state.stats.statsGroupBy);

  useEffect(() => {
    (async () => await getRequestsStats(project.id, statsGroupBy?.commonStats, makeRequestsStatsFilters(statsFilters)))()
  }, [project.id, statsFilters, statsGroupBy?.commonStats]);

  useEffect(() => {
    (async () => await getRatioStatusCodes(project.id, statsGroupBy?.ratioStatusCodes, makeRequestsStatsFilters(statsFilters)))()
  }, [project.id, statsFilters, statsGroupBy?.ratioStatusCodes]);

  const getRequestsStats = async (projectId, groupBy = 'hours', filters = {}) => {
    setLoad({...load, commonStats: true});
    const query = await objectToQuery({...filters, groupBy});
    const {json} = await get(projectsApi + `${projectId}/requests/stats/${query}`);
    setRequestsStats(json);
    setLoad({...load, commonStats: false});
  }

  const getRatioStatusCodes = async (projectId, groupBy = 'hours', filters = {}) => {
    setLoad({...load, ratioStatusCodes: true});
    const query = await objectToQuery({...filters, groupBy});
    const {json} = await get(projectsApi + `${projectId}/requests/ratio-status-codes/${query}`);
    store.dispatch({type: SET_RATIO_STATUS_CODES, payload: json});
    setLoad({...load, ratioStatusCodes: false});
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
