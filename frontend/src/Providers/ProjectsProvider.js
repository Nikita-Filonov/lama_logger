import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Constants";
import {useUsers} from "./UsersProvider";
import {CREATE_PROJECT, SET_PROJECTS} from "../Redux/Projects/actionTypes";


const ProjectsContext = React.createContext(null);

const ProjectsProvider = ({children, store}) => {
  const {token} = useUsers()
  const usersApi = baseUrl + 'api/v1/projects/';
  const [load, setLoad] = useState(null);

  useEffect(() => {
    (async () => {
      token && await getProjects()
    })();
  }, [token]);

  const getProjects = useCallback(async () => {
    setLoad(true)
    await fetch(usersApi, {
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


  const createProject = async (payload) => {
    await fetch(usersApi, {
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


  return (
    <ProjectsContext.Provider
      value={{
        createProject
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
