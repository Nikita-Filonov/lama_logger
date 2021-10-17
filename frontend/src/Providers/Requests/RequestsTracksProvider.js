import React, {useContext, useEffect, useState} from 'react';
import {baseUrl} from "../../Utils/Constants";
import {useUsers} from "../UsersProvider";
import {queryWithPagination} from "../../Utils/Untils/Common";
import {SET_TRACKS} from "../../Redux/Requests/Tracks/actionTypes";
import {useSelector} from "react-redux";


const RequestsTracksContext = React.createContext(null);

const RequestsTracksProvider = ({children, store}) => {
  const {token} = useUsers()
  const projectsApi = baseUrl + 'api/v1/projects/';
  const [load, setLoad] = useState(false);

  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => token && await getRequestsTracks(project.id, 25))()
  }, [token, project.id])

  const getRequestsTracks = async (projectId, limit = null, offset = null, filters = {}) => {
    setLoad(state => state)
    const query = await queryWithPagination(filters, limit, offset, 'Tracks');
    await fetch(projectsApi + `${projectId}/tracks/${query}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(async payload => {
        store.dispatch({type: SET_TRACKS, payload})
        setLoad(false);
      });
  }

  return (
    <RequestsTracksContext.Provider
      value={{
        load,
        getRequestsTracks,
      }}
    >
      {children}
    </RequestsTracksContext.Provider>
  );
};

const useRequestsTracks = () => {
  const event = useContext(RequestsTracksContext);
  if (event == null) {
    throw new Error('useRequestsTracks() called outside of a RequestsTracksProvider?');
  }
  return event;
};

export {RequestsTracksProvider, useRequestsTracks};
