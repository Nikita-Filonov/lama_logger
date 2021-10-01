import React, {useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Constants";
import {useUsers} from "./UsersProvider";


const ProjectsContext = React.createContext(null);

const ProjectsProvider = ({children}) => {
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
        console.log(data)
        setLoad(false)
      });
  }, [token]);


  return (
    <ProjectsContext.Provider
      value={{}}
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
