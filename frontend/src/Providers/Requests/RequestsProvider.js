import React, {useContext, useState} from 'react';
import {
  CREATE_SAVED_REQUESTS_FILTER,
  DELETE_REQUESTS,
  DELETE_SAVED_REQUESTS_FILTER,
  SET_REQUESTS,
  SET_SAVED_REQUESTS_FILTERS
} from "../../Redux/Requests/Requests/actionTypes";
import {useAlerts} from "../AlertsProvider";
import {copyText, queryWithPagination} from "../../Utils/Utils/Common";
import {get, post, remove} from "../../Utils/Api/Fetch";


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

  const getRequestAsCurl = async (projectId, requestId) => {
    const {json, error} = await get(projectsApi + `${projectId}/requests/${requestId}/curl/`);
    copyText(json?.curl)
    setAlert(error ? json : {message: 'Request copied to clipboard', level: 'success'})
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

  return (
    <RequestsContext.Provider
      value={{
        load,
        request,
        getRequests,
        getRequestAsCurl,
        deleteRequests,
        deleteRequest,
        getRequestsFilters,
        createRequestsFilter,
        deleteRequestsFilter
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
