import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl, SUCCESS_CODES} from "../Utils/Constants";
import {useUsers} from "./UsersProvider";
import {CREATE_PROJECT, SET_PROJECT, SET_PROJECTS, UPDATE_PROJECT} from "../Redux/Projects/actionTypes";
import {objectToQuery} from "../Utils/Utils";
import {useAlerts} from "./AlertsProvider";


const ProjectsContext = React.createContext(null);

const ProjectsProvider = ({children, store}) => {
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = baseUrl + 'api/v1/projects/';
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false)

  useEffect(() => {
    (async () => {
      token && await getProjects()
    })();
  }, [token]);

  const updateProjectState = async (data) => {
    store.dispatch({type: SET_PROJECT, payload: data})
    localStorage.setItem('project', JSON.stringify(data))
    store.dispatch({type: UPDATE_PROJECT, payload: data});
  }

  const checkResponse = async (response, successMessage = {}, errorMessage = null) => {
    if (SUCCESS_CODES.includes(response.status)) {
      setAlert(successMessage)
      response.json().then(async data => await updateProjectState(data))
    } else {
      response.json().then(async data => setAlert(errorMessage || data))
    }
    setRequest(false)
  }

  const getProjects = useCallback(async (query = {archived: 'False'}) => {
    setLoad(true)
    await fetch(projectsApi + await objectToQuery(query), {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        store.dispatch({type: SET_PROJECTS, payload: data});
        setLoad(false);
      });
  }, [token]);

  const getProject = async (projectId) => {
    setLoad(true)
    await fetch(projectsApi + `${projectId}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async data => {
        store.dispatch({type: SET_PROJECT, payload: data});
        setLoad(false);
      });
  }

  const createProject = async (payload) => {
    await fetch(projectsApi, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(async data => store.dispatch({type: CREATE_PROJECT, payload: data}));
  }

  const updateProject = async (projectId, payload, isLazy = false) => {
    !isLazy && setRequest(true)
    await fetch(projectsApi + `${projectId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(async data => {
        !isLazy && await updateProjectState(data)
        setRequest(false)
      });
  }

  const inviteMember = async (projectId, payload) => {
    setRequest(true)
    const response = await fetch(projectsApi + `${projectId}/members/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    await checkResponse(response, {message: 'Member was invited to project', level: 'success'})
  }

  const updateMember = async (projectId, memberId, payload, isLazy = false) => {
    !isLazy && setRequest(true)
    const response = await fetch(projectsApi + `${projectId}/members/${memberId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    await checkResponse(
      response,
      {message: 'Member was updated', level: 'success'},
      {message: 'An error occurred while updating member', level: 'error'}
    )
  }

  const deleteMembers = async (projectId, payload) => {
    setRequest(true)
    const response = await fetch(projectsApi + `${projectId}/members/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    await checkResponse(response, {message: 'Members were deleted', level: 'success'})
  }

  const createRole = async (projectId, payload) => {
    setRequest(true)
    const response = await fetch(projectsApi + `${projectId}/roles/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    await checkResponse(response, {message: 'Role was created', level: 'success'})
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
        createRole
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
