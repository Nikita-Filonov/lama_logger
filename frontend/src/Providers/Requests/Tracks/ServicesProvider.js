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
import {get, remove} from "../../../Utils/Api/Fetch";


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
    const response = await fetch(projectsApi + `${projectId}/activities/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const json = await response.json();
    if (response.ok) {
      store.dispatch({type: CREATE_ACTIVITY, payload: json});
      setAlert({message: 'Activity was successfully created', level: 'success'});
    } else {
      setAlert(json);
    }
    setRequest(false)
  }

  const moveActivities = async (projectId, payload) => {
    const response = await fetch(projectsApi + `${projectId}/activities/move/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      setAlert({message: 'Activities positions was moved', level: 'success'})
    } else {
      const error = await response.json();
      setAlert(error)
    }
  }

  const deleteActivity = async (projectId, activityId) => {
    const {json, error} = await remove(projectsApi + `${projectId}/activities/${activityId}/`);
    !error && store.dispatch({type: DELETE_ACTIVITY, payload: {activityId}});
    setAlert(error ? json : {message: 'Activity successfully deleted', level: 'success'})
  }

  const createService = async (projectId, activityId, payload) => {
    setRequest(true)
    const response = await fetch(projectsApi + `${projectId}/activities/${activityId}/services/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json();
    if (response.ok) {
      store.dispatch({type: CREATE_SERVICE, payload: {activityId, service: data}});
      setAlert({message: 'Service was successfully created', level: 'success'})
    } else {
      setAlert(data)
    }
    setRequest(false)
  }

  const moveServices = async (projectId, payload) => {
    setRequest(true)
    const endpoint = projectsApi + `${projectId}/activities/services/move/`;
    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      setAlert({message: 'Service positions was moved', level: 'success'});
    } else {
      const data = await response.json();
      setAlert(data);
    }
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
