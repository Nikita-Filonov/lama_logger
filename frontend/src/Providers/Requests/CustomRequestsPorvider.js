import React, {useContext, useEffect, useState} from 'react';
import {queryWithPagination} from "../../Utils/Utils/Common";
import {get, patch, post, remove} from "../../Utils/Api/Fetch";
import {
  CREATE_CUSTOM_REQUEST,
  DELETE_CUSTOM_REQUEST,
  SET_CUSTOM_REQUEST,
  SET_CUSTOM_REQUESTS,
  UPDATE_CUSTOM_REQUEST
} from "../../Redux/Requests/CustomRequests/actionTypes";
import {useSelector} from "react-redux";
import {useAlerts} from "../AlertsProvider";


const CustomRequestsContext = React.createContext(null);

const CustomRequestsProvider = ({children, store}) => {
  const {setAlert} = useAlerts();
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(false);
  const [request, setRequest] = useState(false);

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => await getCustomRequests(
      project.id,
      50,
      0,
      {filters: JSON.stringify({isCustom: true})}
    ))()
  }, [project.id])

  const getCustomRequests = async (projectId, limit = 50, offset = 0, filters = {}) => {
    setLoad(state => state);
    const query = await queryWithPagination(filters, limit, offset, 'CustomRequests');
    const {json} = await get(projectsApi + `${projectId}/custom-requests/${query}`);
    store.dispatch({type: SET_CUSTOM_REQUESTS, payload: json});
    setLoad(false);
  }

  const createCustomRequest = async (projectId, payload) => {
    setRequest(true);
    const {json, error} = await post(projectsApi + `${projectId}/custom-requests/`, payload);
    !error && store.dispatch({type: CREATE_CUSTOM_REQUEST, payload: json});
    !error && store.dispatch({type: SET_CUSTOM_REQUEST, payload: json});
    setAlert(error ? json : {message: 'Request successfully created', level: 'success'});
    setRequest(false);
  }

  const updateCustomRequest = async (projectId, requestId, payload) => {
    setRequest(true);
    const {json, error} = await patch(projectsApi + `${projectId}/custom-requests/${requestId}/`, payload);
    !error && store.dispatch({type: UPDATE_CUSTOM_REQUEST, payload: {requestId, payload: json}});
    error && setAlert(json);
    setRequest(false);
  }

  const deleteCustomRequest = async (projectId, requestId) => {
    setRequest(true);
    const {json, error} = await remove(projectsApi + `${projectId}/custom-requests/${requestId}/`);
    !error && store.dispatch({type: DELETE_CUSTOM_REQUEST, payload: {requestId}});
    setAlert(error ? json : {message: 'Request successfully deleted', level: 'success'});
    setRequest(false);
  }

  const createCustomRequestHistory = async (projectId, payload) => {
    const {json, error} = await post(projectsApi + `${projectId}/custom-requests/`, payload);
  }

  return (
    <CustomRequestsContext.Provider
      value={{
        load,
        request,
        getCustomRequests,
        createCustomRequest,
        updateCustomRequest,
        deleteCustomRequest
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
