import React, {useContext, useEffect, useState} from 'react';
import {objectToQuery, queryWithPagination} from "../../Utils/Utils/Common";
import {get, patch, post, remove} from "../../Utils/Api/Fetch";
import {
  CREATE_CUSTOM_REQUEST,
  CREATE_CUSTOM_REQUESTS_HISTORY,
  DELETE_CUSTOM_REQUEST,
  DELETE_CUSTOM_REQUESTS_HISTORY,
  SET_CUSTOM_REQUEST,
  SET_CUSTOM_REQUEST_ERROR,
  SET_CUSTOM_REQUESTS,
  SET_CUSTOM_REQUESTS_HISTORY,
  UPDATE_CUSTOM_REQUEST
} from "../../Redux/Requests/CustomRequests/actionTypes";
import {useSelector} from "react-redux";
import {useAlerts} from "../AlertsProvider";
import {INITIAL_CUSTOM_REQUESTS} from "../../Redux/Requests/CustomRequests/initialState";
import {useUsers} from "../Users/UsersProvider";


const CustomRequestsContext = React.createContext(null);

const CustomRequestsProvider = ({children, store}) => {
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = 'api/v1/projects/';
  const [loadRequests, setLoadRequests] = useState(true);
  const [loadHistory, setLoadHistory] = useState(true);
  const [request, setRequest] = useState(false);

  const project = useSelector(state => state.projects.project);
  const historyPagination = useSelector(state => state.customRequests.customRequestsHistoryPagination);
  const customRequest = useSelector(state => state.customRequests.customRequest)

  useEffect(() => {
    (async () => {
      token && await getCustomRequests(project.id, 50, 0, {filters: JSON.stringify({isCustom: true})});
    })()
  }, [token, project.id]);

  useEffect(() => {
    (async () => token && await getCustomRequestsHistory(
      project.id,
      historyPagination.rowsPerPage,
      historyPagination.page * historyPagination.rowsPerPage
    ))()
  }, [token, project.id, historyPagination])


  const getCustomRequests = async (projectId, limit = 50, offset = 0, filters = {}) => {
    setLoadRequests(state => state);
    const query = await queryWithPagination(filters, limit, offset, 'CustomRequests');
    const {json} = await get(projectsApi + `${projectId}/custom-requests/${query}`);
    store.dispatch({type: SET_CUSTOM_REQUESTS, payload: json});
    setLoadRequests(false);
  }

  const createCustomRequest = async (projectId, payload) => {
    const {json, error} = await post(projectsApi + `${projectId}/custom-requests/`, payload);
    !error && store.dispatch({type: CREATE_CUSTOM_REQUEST, payload: json});
    !error && store.dispatch({type: SET_CUSTOM_REQUEST, payload: json});
    setAlert(error ? json : {message: 'Request successfully created', level: 'success'});
  }

  const updateCustomRequest = async (projectId, requestId, payload) => {
    const {json, error} = await patch(projectsApi + `${projectId}/custom-requests/${requestId}/`, payload);
    !error && store.dispatch({type: UPDATE_CUSTOM_REQUEST, payload: {requestId, payload: json}});
    error && setAlert(json);
  }

  const deleteCustomRequest = async (projectId, requestId) => {
    const {json, error} = await remove(projectsApi + `${projectId}/custom-requests/${requestId}/`);
    !error && store.dispatch({type: DELETE_CUSTOM_REQUEST, payload: {requestId}});
    setAlert(error ? json : {message: 'Request successfully deleted', level: 'success'});
  }

  const sendCustomRequest = async (projectId, requestId) => {
    setRequest(true);
    const {json, error} = await post(projectsApi + `${projectId}/custom-requests/${requestId}/send/`);
    error && setAlert(json);

    if (!error) {
      store.dispatch({type: SET_CUSTOM_REQUEST, payload: json});
      store.dispatch({type: SET_CUSTOM_REQUEST_ERROR, payload: INITIAL_CUSTOM_REQUESTS.customRequestError});
    }

    if (error && json?.data) {
      store.dispatch({type: SET_CUSTOM_REQUEST_ERROR, payload: {level: json?.level, data: json.data}});
      store.dispatch({
        type: SET_CUSTOM_REQUEST,
        payload: {...customRequest, responseHeaders: {}, responseBody: null, statusCode: null}
      })
    }
    setRequest(false);
  }

  const getCustomRequestsHistory = async (projectId, limit = 25, offset = 0) => {
    setLoadHistory(state => state);
    const query = await objectToQuery({limit, offset});
    const {json} = await get(projectsApi + `${projectId}/custom-requests-history/${query}`);
    store.dispatch({type: SET_CUSTOM_REQUESTS_HISTORY, payload: json});
    setLoadHistory(false);
  };

  const createCustomRequestsHistory = async (projectId, payload) => {
    const {json, error} = await post(projectsApi + `${projectId}/custom-requests-history/`, payload);
    !error && store.dispatch({type: CREATE_CUSTOM_REQUESTS_HISTORY, payload: json});
    error && setAlert(json);
  };

  const deleteCustomRequestsHistory = async (projectId, sectionId, payload) => {
    const {json, error} = await remove(projectsApi + `${projectId}/custom-requests-history/`, payload);
    setAlert(error ? json : {message: 'History was successfully deleted', level: 'success'});
    sectionId && store.dispatch({type: DELETE_CUSTOM_REQUESTS_HISTORY, payload: {sectionId, payload}})
  }

  return (
    <CustomRequestsContext.Provider
      value={{
        request,
        loadHistory,
        loadRequests,
        getCustomRequests,
        sendCustomRequest,
        createCustomRequest,
        updateCustomRequest,
        deleteCustomRequest,
        createCustomRequestsHistory,
        deleteCustomRequestsHistory
      }}
    >
      {children}
    </CustomRequestsContext.Provider>
  );
};

const useCustomRequests = () => {
  const event = useContext(CustomRequestsContext);
  if (event == null) {
    throw new Error('useCustomRequests() called outside of a CustomRequestsProvider?');
  }
  return event;
};

export {CustomRequestsProvider, useCustomRequests};
