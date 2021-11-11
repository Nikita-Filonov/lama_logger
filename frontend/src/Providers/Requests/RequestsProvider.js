import React, {useContext, useState} from 'react';
import {
  CREATE_SAVED_REQUESTS_FILTER,
  DELETE_REQUESTS,
  DELETE_SAVED_REQUESTS_FILTER,
  SET_REQUEST,
  SET_REQUESTS,
  SET_SAVED_REQUESTS_FILTERS
} from "../../Redux/Requests/Requests/actionTypes";
import {useAlerts} from "../AlertsProvider";
import {queryWithPagination} from "../../Utils/Utils/Common";
import {get, patch, post, remove} from "../../Utils/Api/Fetch";
import {INITIAL_REQUESTS} from "../../Redux/Requests/Requests/initialState";


const RequestsContext = React.createContext(null);

const RequestsProvider = ({children, store}) => {
  const {setAlert} = useAlerts();
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(false);
  const [request, setRequest] = useState(false);

  const getRequests = async (projectId, limit = null, offset = null, filters = {}) => {
    setLoad(state => state);
    const query = await queryWithPagination(filters, limit, offset, 'Requests');
    const {json} = await get(projectsApi + `${projectId}/requests/${query}`);
    store.dispatch({type: SET_REQUESTS, payload: json});
    setLoad(false);
  }

  const deleteRequests = async (projectId, requests) => {
    store.dispatch({type: DELETE_REQUESTS, payload: requests});
    const {json, error} = await remove(projectsApi + `${projectId}/requests/`, requests);
    setAlert(error ? json : {message: `${requests?.length} were successfully deleted`, level: 'success'})
  }

  const deleteRequest = async (projectId, requestId) => {
    const {json, error} = await remove(projectsApi + `${projectId}/requests/${requestId}/`);
    !error && store.dispatch({type: DELETE_REQUESTS, payload: [requestId]});
    setAlert(json);
  }

  const deleteAllRequests = async (projectId) => {
    const {json, error} = await remove(projectsApi + `${projectId}/requests/clear-all/`);
    if (!error) {
      store.dispatch({type: SET_REQUESTS, payload: INITIAL_REQUESTS.requests});
      store.dispatch({type: SET_REQUEST, payload: {}});
    }
    setAlert(error ? json : {message: 'All requests were successfully cleared', level: 'success'});
  }

  const getRequestsFilters = async (projectId) => {
    const {json} = await get(projectsApi + `${projectId}/requests/filters/`);
    store.dispatch({type: SET_SAVED_REQUESTS_FILTERS, payload: json})
  }

  const createRequestsFilter = async (projectId, payload) => {
    setRequest(true);
    const {json, error} = await post(projectsApi + `${projectId}/requests/filters/`, payload);
    !error && store.dispatch({type: CREATE_SAVED_REQUESTS_FILTER, payload: json});
    setAlert(error ? json : {message: 'Requests filters were successfully saved', level: 'success'});
    setRequest(false);
  }

  const deleteRequestsFilter = async (projectId, filterId) => {
    const {json, error} = await remove(projectsApi + `${projectId}/requests/filters/${filterId}/`);
    !error && store.dispatch({type: DELETE_SAVED_REQUESTS_FILTER, payload: {filterId}});
    setAlert(json);
  }

  const updateRequestsFilter = async (projectId, filterId, payload, isLazy = true) => {
    const {json, error} = await patch(projectsApi + `${projectId}/requests/filters/${filterId}/`, payload);
    !isLazy && setAlert(error ? json : {message: 'Requests filters were successfully updated', level: 'success'})
  }

  return (
    <RequestsContext.Provider
      value={{
        load,
        request,
        getRequests,
        deleteRequests,
        deleteRequest,
        deleteAllRequests,
        getRequestsFilters,
        createRequestsFilter,
        deleteRequestsFilter,
        updateRequestsFilter
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

const useRequests = () => {
  const event = useContext(RequestsContext);
  if (event == null) {
    throw new Error('useRequests() called outside of a ProjectsProvider?');
  }
  return event;
};

export {RequestsProvider, useRequests};
