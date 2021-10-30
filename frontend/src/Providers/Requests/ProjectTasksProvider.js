import React, {useContext, useEffect, useState} from 'react';
import {get, post} from "../../Utils/Api/Fetch";
import {useUsers} from "../Users/UsersProvider";
import {useSelector} from "react-redux";
import {useAlerts} from "../AlertsProvider";


const ProjectTasksContext = React.createContext(null);

const ProjectTasksProvider = ({children}) => {
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(false);
  const [request, setRequest] = useState(false);
  const [tasks, setTasks] = useState([]);

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => await getTasks(project.id))()
  }, [token, project])

  const getTasks = async (projectId) => {
    setLoad(true);
    const {json} = await get(projectsApi + `${projectId}/tasks/`);
    setTasks(json);
    setLoad(false)
  }

  const createTask = async (projectId, payload) => {
    setRequest(true)
    const {json, error} = await post(projectsApi + `${projectId}/tasks/`, payload);
    !error && setTasks([...tasks, json])
    setAlert(error ? json : {message: 'Task successfully created', level: 'success'});
    setRequest(false)
  }

  return (
    <ProjectTasksContext.Provider
      value={{
        load,
        tasks,
        getTasks,
        createTask
      }}
    >
      {children}
    </ProjectTasksContext.Provider>
  );
};

const useProjectTasks = () => {
  const event = useContext(ProjectTasksContext);
  if (event == null) {
    throw new Error('useProjectTasks() called outside of a ProjectTasksProvider?');
  }
  return event;
};

export {ProjectTasksProvider, useProjectTasks};
