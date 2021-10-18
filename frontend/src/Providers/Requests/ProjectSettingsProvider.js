import React, {useContext, useEffect, useState} from 'react';
import {baseUrl} from "../../Utils/Constants";
import {useUsers} from "../Users/UsersProvider";
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

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => (token && project?.id) && await getProjectSettings(project.id))()
  }, [token, project?.id])

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

    if (response.ok) {
      setAlert({message: 'Project settings was updated', level: 'success'})
      const payload = await response.json();
      store.dispatch({type: SET_PROJECT_SETTINGS, payload})
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
