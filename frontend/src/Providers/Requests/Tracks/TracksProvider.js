import React, {useContext, useEffect, useState} from 'react';
import {useAlerts} from "../../AlertsProvider";
import {CREATE_TRACK, SET_TRACK_REQUESTS} from "../../../Redux/Requests/Tracks/actionTypes";
import {get, post} from "../../../Utils/Api/Fetch";
import {useSelector} from "react-redux";
import {queryWithPagination} from "../../../Utils/Utils/Common";


const TracksContext = React.createContext(null);

const TracksProvider = ({children, store}) => {
  const {setAlert} = useAlerts();
  const projectsApi = 'api/v1/projects/';
  const [load, setLoad] = useState(false);
  const [request, setRequest] = useState(false);

  const track = useSelector(state => state.tracks.track);
  const project = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => (track?.id && project?.id) && await getTrackRequests(project.id, track.id))()
  }, [project?.id, track?.id])

  const createTrack = async (projectId, serviceId, payload) => {
    setRequest(true)
    const endpoint = projectsApi + `${projectId}/activities/services/${serviceId}/tracks/`;
    const {json, error} = await post(endpoint, payload);
    !error && store.dispatch({type: CREATE_TRACK, payload: {serviceId, track: json}})
    setAlert(error ? json : {message: 'Track successfully created', level: 'success'})
    setRequest(false);
  }

  const getTrackRequests = async (projectId, trackId, limit = 25, offset = 0, filters = {}) => {
    setLoad(state => state);
    const query = await queryWithPagination(filters, limit, offset, 'TrackRequests');
    const {json, error} = await get(projectsApi + `${projectId}/tracks/${trackId}/requests/${query}`);
    !error && store.dispatch({type: SET_TRACK_REQUESTS, payload: json});
    setLoad(false);
  }

  return (
    <TracksContext.Provider
      value={{
        load,
        request,
        createTrack,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};

const useTracks = () => {
  const event = useContext(TracksContext);
  if (event == null) {
    throw new Error('useTracks() called outside of a TracksProvider?');
  }
  return event;
};

export {TracksProvider, useTracks};
