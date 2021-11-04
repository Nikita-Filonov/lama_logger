import React, {useContext, useEffect, useState} from 'react';
import {queryWithPagination} from "../../Utils/Utils/Common";
import {get} from "../../Utils/Api/Fetch";
import {SET_CUSTOM_REQUESTS} from "../../Redux/Requests/CustomRequests/actionTypes";
import {useSelector} from "react-redux";


const CustomRequestsContext = React.createContext(null);

const CustomRequestsProvider = ({children, store}) => {
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(false);
  const [request, setRequest] = useState(false);

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => await getCustomRequests(
      project.id,
      50,
      0,
      {filters: JSON.stringify({isCustom: true})}
    ))()
  }, [project])

  const getCustomRequests = async (projectId, limit = 50, offset = 0, filters = {}) => {
    setLoad(state => state);
    const query = await queryWithPagination(filters, limit, offset, 'CustomRequests');
    const {json} = await get(projectsApi + `${projectId}/custom-requests/${query}`);
    store.dispatch({type: SET_CUSTOM_REQUESTS, payload: json});
    setLoad(false);
  }

  return (
    <CustomRequestsContext.Provider
      value={{
        load,
        request,
        getCustomRequests,
      }}
    >
      {children}
    </CustomRequestsContext.Provider>
  );
};

const useCustomRequests = () => {
  const event = useContext(CustomRequestsContext);
  if (event == null) {
    throw new Error('useCustomRequests() called outside of a CustomRequestsProvider?');
  }
  return event;
};

export {CustomRequestsProvider, useCustomRequests};
