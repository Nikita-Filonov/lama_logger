import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {
  CREATE_ACTIVITY,
  CREATE_SERVICE,
  DELETE_ACTIVITY,
  SET_ACTIVITIES
} from "../../../Redux/Requests/Tracks/actionTypes";
import {useUsers} from "../../Users/UsersProvider";
import {useAlerts} from "../../AlertsProvider";
import {get, patch, post, remove} from "../../../Utils/Api/Fetch";


const ServicesContext = React.createContext(null);

const ServicesProvider = ({children, store}) => {
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => (token && project?.id) && await getActivities(project.id))()
  }, [token, project?.id])

  const getActivities = async (projectId) => {
    setLoad(true)
    const {json} = await get(projectsApi + `${projectId}/activities/`);
    store.dispatch({type: SET_ACTIVITIES, payload: json});
    setLoad(false);
  }

  const createActivity = async (projectId, payload) => {
    setRequest(true)
    const {json, error} = await post(projectsApi + `${projectId}/activities/`, payload);
    !error && store.dispatch({type: CREATE_ACTIVITY, payload: json});
    setAlert(error ? json : {message: 'Activity was successfully created', level: 'success'});
    setRequest(false)
  }

  const moveActivities = async (projectId, payload) => {
    const {json, error} = await patch(projectsApi + `${projectId}/activities/move/`, payload);
    setAlert(error ? json : {message: 'Activities positions was moved', level: 'success'});
  }

  const deleteActivity = async (projectId, activityId) => {
    const {json, error} = await remove(projectsApi + `${projectId}/activities/${activityId}/`);
    !error && store.dispatch({type: DELETE_ACTIVITY, payload: {activityId}});
    setAlert(error ? json : {message: 'Activity successfully deleted', level: 'success'})
  }

  const createService = async (projectId, activityId, payload) => {
    setRequest(true)
    const {json, error} = await post(projectsApi + `${projectId}/activities/${activityId}/services/`, payload);
    !error && store.dispatch({type: CREATE_SERVICE, payload: {activityId, service: json}});
    setAlert(error ? json : {message: 'Service was successfully created', level: 'success'})
    setRequest(false)
  }

  const moveServices = async (projectId, payload) => {
    setRequest(true)
    const {json, error} = await patch(projectsApi + `${projectId}/activities/services/move/`, payload);
    setAlert(error ? json : {message: 'Service positions was moved', level: 'success'});
    setRequest(false)
  }

  return (
    <ServicesContext.Provider
      value={{
        load,
        request,
        createService,
        createActivity,
        moveActivities,
        deleteActivity,
        moveServices
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

const useServices = () => {
  const event = useContext(ServicesContext);
  if (event == null) {
    throw new Error('useServices() called outside of a ServicesProvider?');
  }
  return event;
};

export {ServicesProvider, useServices};
