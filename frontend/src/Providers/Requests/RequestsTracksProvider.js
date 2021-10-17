import React, {useContext, useEffect, useState} from 'react';
import {baseUrl} from "../../Utils/Constants";
import {useUsers} from "../UsersProvider";
import {queryWithPagination} from "../../Utils/Untils/Common";
import {CREATE_TRACK, SET_TRACKS} from "../../Redux/Requests/Tracks/actionTypes";
import {useSelector} from "react-redux";
import {useAlerts} from "../AlertsProvider";


const RequestsTracksContext = React.createContext(null);

const RequestsTracksProvider = ({children, store}) => {
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = baseUrl + 'api/v1/projects/';
  const [load, setLoad] = useState(false);
  const [request, setRequest] = useState(false);

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

  const createRequestsTrack = async (projectId, payload) => {
    setRequest(true)
    const response = await fetch(projectsApi + `${projectId}/tracks/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      response.json().then(payload => {
        store.dispatch({type: CREATE_TRACK, payload});
        setAlert({message: 'Track successfully created', level: 'success'})
      })
    } else {
      response.json().then(data => setAlert(data))
    }
    setRequest(false);
  }

  return (
    <RequestsTracksContext.Provider
      value={{
        load,
        request,
        getRequestsTracks,
        createRequestsTrack
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
