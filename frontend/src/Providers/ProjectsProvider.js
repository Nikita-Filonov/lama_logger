import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useUsers} from "./Users/UsersProvider";
import {CREATE_PROJECT, SET_PROJECT, SET_PROJECTS, UPDATE_PROJECT} from "../Redux/Projects/actionTypes";
import {useAlerts} from "./AlertsProvider";
import {objectToQuery} from "../Utils/Utils/Common";
import {get, patch, post, remove} from "../Utils/Api/Fetch";
import {useHistory} from "react-router-dom";


const ProjectsContext = React.createContext(null);

const ProjectsProvider = ({children, store}) => {
  const history = useHistory();
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);


  useEffect(() => {
    (async () => token && await getProjects())();
  }, [token]);

  const updateProjectState = async (data) => {
    store.dispatch({type: SET_PROJECT, payload: data})
    store.dispatch({type: UPDATE_PROJECT, payload: data});
  }

  const checkResponse = async ({json, error}, successMessage = {}, errorMessage = null) => {
    if (!error) {
      setAlert(successMessage)
      await updateProjectState(json)
    } else {
      setAlert(errorMessage || json)
    }
    setRequest(false)
  }

  const getProjects = useCallback(async (query = {archived: 'False'}) => {
    setLoad(true)
    const {json} = await get(projectsApi + await objectToQuery(query));
    store.dispatch({type: SET_PROJECTS, payload: json});
    setLoad(false);
  }, [token]);

  const getProject = async (projectId) => {
    setLoad(true)
    const {json, error} = await get(projectsApi + `${projectId}/`);
    !error && store.dispatch({type: SET_PROJECT, payload: json});
    error && setAlert(json);
    error && history.push('/projects');
    setLoad(false);
  }

  const createProject = async (payload) => {
    setRequest(true)
    const {json, error} = await post(projectsApi, payload);
    !error && store.dispatch({type: CREATE_PROJECT, payload: json});
    setAlert(error ? json : {message: 'Project successfully created', level: 'success'});
    setRequest(false)
  }

  const updateProject = async (projectId, payload, isLazy = false) => {
    !isLazy && setRequest(true)
    const response = await patch(projectsApi + `${projectId}/`, payload)
    !isLazy && await checkResponse(response, {message: 'Project successfully updated', level: 'success'})
  }

  const inviteMember = async (projectId, payload) => {
    setRequest(true)
    const response = await post(projectsApi + `${projectId}/members/`, payload);
    await checkResponse(response, {message: 'Member was invited to project', level: 'success'})
  }

  const updateMember = async (projectId, memberId, payload, isLazy = false) => {
    !isLazy && setRequest(true)
    const response = await patch(projectsApi + `${projectId}/members/${memberId}/`, payload);
    await checkResponse(
      response,
      {message: 'Member was updated', level: 'success'},
      {message: 'An error occurred while updating member', level: 'error'}
    )
  }

  const deleteMembers = async (projectId, payload) => {
    setRequest(true)
    const response = await remove(projectsApi + `${projectId}/members/`, payload);
    await checkResponse(response, {message: 'Members were deleted', level: 'success'})
  }

  const createRole = async (projectId, payload) => {
    setRequest(true)
    const response = await post(projectsApi + `${projectId}/roles/`, payload);
    await checkResponse(response, {message: 'Role was created', level: 'success'})
  }

  const updateRole = async (projectId, roleId, payload, isLazy = false) => {
    !isLazy && setRequest(true)
    const response = await patch(projectsApi + `${projectId}/roles/${roleId}/`, payload);
    await checkResponse(
      response,
      {message: 'Role was updated', level: 'success'},
      {message: 'An error occurred while updating role', level: 'error'}
    )
  }

  return (
    <ProjectsContext.Provider
      value={{
        load,
        request,
        getProject,
        createProject,
        updateProject,
        inviteMember,
        updateMember,
        deleteMembers,
        createRole,
        updateRole
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjects = () => {
  const event = useContext(ProjectsContext);
  if (event == null) {
    throw new Error('useProjects() called outside of a ProjectsProvider?');
  }
  return event;
};

export {ProjectsProvider, useProjects};
