import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Constants";
import {useUsers} from "./UsersProvider";
import {CREATE_PROJECT, SET_PROJECT, SET_PROJECTS, UPDATE_PROJECT} from "../Redux/Projects/actionTypes";


const ProjectsContext = React.createContext(null);

const ProjectsProvider = ({children, store}) => {
  const {token} = useUsers()
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

  const getProjects = useCallback(async () => {
    setLoad(true)
    await fetch(projectsApi, {
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

  const updateProject = async (projectId, payload) => {
    setRequest(true)
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
        await updateProjectState(data)
        setRequest(false)
      });
  }


  return (
    <ProjectsContext.Provider
      value={{
        load,
        request,
        getProject,
        createProject,
        updateProject
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
