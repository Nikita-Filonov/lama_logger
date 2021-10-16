import React, {useContext, useEffect, useState} from 'react';
import {baseUrl, SUCCESS_CODES} from "../../Utils/Constants";
import {useUsers} from "../UsersProvider";
import {SET_PROJECT_SETTINGS} from "../../Redux/Projects/actionTypes";
import {useSelector} from "react-redux";
import {useAlerts} from "../AlertsProvider";


const ProjectSettingsContext = React.createContext(null);

const ProjectSettingsProvider = ({children, store}) => {
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = baseUrl + 'api/v1/projects/';
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);
  const [projectSettings, setProjectSettings] = useState({})

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => token && await getProjectSettings(project.id))()
  }, [token, project.id])

  const checkResponse = async (response, successMessage = {}, errorMessage = null) => {
    if (SUCCESS_CODES.includes(response.status)) {
      setAlert(successMessage)
      response.json().then(async data => await store.dispatch({type: SET_PROJECT_SETTINGS, payload: data}))
    } else {
      response.json().then(async data => setAlert(errorMessage || data))
    }
    setRequest(false)
  }

  const getProjectSettings = async (projectId) => {
    setLoad(true)
    await fetch(projectsApi + `${projectId}/settings/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        store.dispatch({type: SET_PROJECT_SETTINGS, payload: data});
        setLoad(false);
      });
  }

  const updateProjectSettings = async (projectId, payload) => {
    setRequest(true);
    const response = await fetch(projectsApi + `${projectId}/settings/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if (SUCCESS_CODES.includes(response.status)) {
      setAlert({message: 'Project settings was updated', level: 'success'})
      response.json().then(async data => await store.dispatch({type: SET_PROJECT_SETTINGS, payload: data}))
    } else {
      setAlert({message: 'Error happened while updating project settings', level: 'error'})
    }
    setRequest(false)
  }

  return (
    <ProjectSettingsContext.Provider
      value={{
        load,
        request,
        projectSettings,
        getProjectSettings,
        updateProjectSettings
      }}
    >
      {children}
    </ProjectSettingsContext.Provider>
  );
};

const useProjectSettings = () => {
  const event = useContext(ProjectSettingsContext);
  if (event == null) {
    throw new Error('useProjectSettings() called outside of a ProjectSettingsProvider?');
  }
  return event;
};

export {ProjectSettingsProvider, useProjectSettings};
