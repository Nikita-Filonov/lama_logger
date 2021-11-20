import React, {useContext, useEffect, useState} from 'react';
import {useUsers} from "../Users/UsersProvider";
import {SET_PROJECT_SETTINGS} from "../../Redux/Projects/actionTypes";
import {useSelector} from "react-redux";
import {useAlerts} from "../AlertsProvider";
import {get, patch} from "../../Utils/Api/Fetch";


const ProjectSettingsContext = React.createContext(null);

const ProjectSettingsProvider = ({children, store}) => {
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => (token && project?.id) && await getProjectSettings(project.id))()
  }, [token, project?.id])

  const getProjectSettings = async (projectId) => {
    setLoad(true)
    const {json, error} = await get(projectsApi + `${projectId}/settings/`);
    !error && store.dispatch({type: SET_PROJECT_SETTINGS, payload: json});
    error && setAlert(json);
    setLoad(false);
  }

  const updateProjectSettings = async (projectId, payload) => {
    setRequest(true);
    const {json, error} = await patch(projectsApi + `${projectId}/settings/`, payload);
    !error && store.dispatch({type: SET_PROJECT_SETTINGS, payload: json});
    setAlert(error ? json : {message: 'Project settings was updated', level: 'success'})
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
