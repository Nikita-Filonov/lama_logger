import React, {useContext, useEffect, useState} from 'react';
import {queryWithPagination} from "../../Utils/Utils/Common";
import {get} from "../../Utils/Api/Fetch";
import {useSelector} from "react-redux";
import {useAlerts} from "../AlertsProvider";
import {useUsers} from "../Users/UsersProvider";
import {SET_TRANSACTIONS} from "../../Redux/Requests/Performance/actionTypes";


const PerformanceContext = React.createContext(null);

const PerformanceProvider = ({children, store}) => {
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(false);
  const [request, setRequest] = useState(false);

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => {
      token && await getTransactions(project.id, 50, 0, {filters: JSON.stringify({})});
    })()
  }, [token, project.id]);


  const getTransactions = async (projectId, limit = 50, offset = 0, filters = {}) => {
    setLoad(state => state);
    const query = await queryWithPagination(filters, limit, offset, 'Transactions');
    const {json} = await get(projectsApi + `${projectId}/transactions/${query}`);
    store.dispatch({type: SET_TRANSACTIONS, payload: json});
    setLoad(false);
  }

  return (
    <PerformanceContext.Provider
      value={{
        load,
        request,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

const usePerformance = () => {
  const event = useContext(PerformanceContext);
  if (event == null) {
    throw new Error('usePerformance() called outside of a PerformanceProvider?');
  }
  return event;
};

export {PerformanceProvider, usePerformance};
