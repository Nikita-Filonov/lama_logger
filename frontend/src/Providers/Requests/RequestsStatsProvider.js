import React, {useContext, useEffect, useState} from 'react';
import {objectToQuery} from "../../Utils/Utils/Common";
import {get} from "../../Utils/Api/Fetch";
import {makeRequestsStatsFilters} from "../../Utils/Utils/Filters";
import {useSelector} from "react-redux";
import {
  SET_NUMBER_OF_REQUESTS,
  SET_RATIO_STATUS_CODES,
  SET_REQUESTS_STATS,
  SET_RESPONSE_TIME
} from "../../Redux/Requests/Stats/actionTypes";


const RequestsStatsContext = React.createContext(null);

const RequestsStatsProvider = ({children, store}) => {
  const projectsApi = 'api/v1/projects/';
  const [loadResponseTime, setLoadResponseTime] = useState(true);
  const [loadRequestsStats, setLoadRequestsStats] = useState(true);
  const [loadNumberOfRequests, setLoadNumberOfRequests] = useState(true);
  const [loadRatioStatusCodes, setLoadRatioStatusCodes] = useState(true);
  const project = useSelector(state => state.projects.project);
  const statsFilters = useSelector(state => state.stats.statsFilters);
  const statsGroupBy = useSelector(state => state.stats.statsGroupBy);

  useEffect(() => {
    (async () => await getRequestsStats(project.id, makeRequestsStatsFilters(statsFilters)))()
  }, [project?.id, statsFilters]);

  useEffect(() => {
    (async () => await getRatioStatusCodes(project.id, statsGroupBy?.ratioStatusCodes, makeRequestsStatsFilters(statsFilters)))()
  }, [project?.id, statsFilters, statsGroupBy?.ratioStatusCodes]);

  useEffect(() => {
    (async () => await getNumberOfRequests(project.id, statsGroupBy?.numberOfRequests, makeRequestsStatsFilters(statsFilters)))()
  }, [project?.id, statsFilters, statsGroupBy?.numberOfRequests]);

  useEffect(() => {
    (async () => await getResponseTime(project.id, statsGroupBy?.responseTime, makeRequestsStatsFilters(statsFilters)))()
  }, [project?.id, statsFilters, statsGroupBy?.responseTime])

  const getRequestsStats = async (projectId, filters = {}) => {
    setLoadRequestsStats(true);
    const query = await objectToQuery(filters);
    const {json, error} = await get(projectsApi + `${projectId}/stats/requests-stats/${query}`);
    !error && store.dispatch({type: SET_REQUESTS_STATS, payload: json});
    setLoadRequestsStats(false);
  };

  const getNumberOfRequests = async (projectId, groupBy = 'hours', filters = {}) => {
    setLoadNumberOfRequests(true);
    const query = await objectToQuery({...filters, groupBy});
    const {json, error} = await get(projectsApi + `${projectId}/stats/number-of-requests/${query}`);
    !error && store.dispatch({type: SET_NUMBER_OF_REQUESTS, payload: json});
    setLoadNumberOfRequests(false);
  };

  const getRatioStatusCodes = async (projectId, groupBy = 'hours', filters = {}) => {
    setLoadRatioStatusCodes(true);
    const query = await objectToQuery({...filters, groupBy});
    const {json, error} = await get(projectsApi + `${projectId}/stats/ratio-status-codes/${query}`);
    !error && store.dispatch({type: SET_RATIO_STATUS_CODES, payload: json});
    setLoadRatioStatusCodes(false);
  };

  const getResponseTime = async (projectId, groupBy = 'hours', filters = {}) => {
    setLoadResponseTime(true);
    const query = await objectToQuery({...filters, groupBy});
    const {json, error} = await get(projectsApi + `${projectId}/stats/response-time/${query}`);
    !error && store.dispatch({type: SET_RESPONSE_TIME, payload: json});
    setLoadResponseTime(false);
  };

  return (
    <RequestsStatsContext.Provider
      value={{
        loadResponseTime,
        loadRequestsStats,
        loadNumberOfRequests,
        loadRatioStatusCodes,
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
