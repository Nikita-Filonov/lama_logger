import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {CREATE_SERVICE, SET_ACTIVITIES} from "../../../Redux/Requests/Tracks/actionTypes";
import {useUsers} from "../../Users/UsersProvider";
import {baseUrl} from "../../../Utils/Constants";


const ServicesContext = React.createContext(null);

const ServicesProvider = ({children, store}) => {
  const {token} = useUsers();
  const projectsApi = baseUrl + 'api/v1/projects/';
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => (token && project?.id) && await getActivities(project.id))()
  }, [token, project?.id])

  const getActivities = async (projectId) => {
    setLoad(true)
    await fetch(projectsApi + `${projectId}/activities/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        store.dispatch({type: SET_ACTIVITIES, payload: data});
        setLoad(false);
      });
  }

  const createService = async (projectId, activityId, payload) => {
    setRequest(true)
    await fetch(projectsApi + `${projectId}/activities/${activityId}/services/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(async data => {
        store.dispatch({type: CREATE_SERVICE, payload: {activityId, service: data}});
        setRequest(false);
      });
  }

  return (
    <ServicesContext.Provider
      value={{
        load,
        request,
        createService
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
