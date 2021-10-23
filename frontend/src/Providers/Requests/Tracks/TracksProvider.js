import React, {useContext, useState} from 'react';
import {useUsers} from "../../Users/UsersProvider";
import {baseUrl} from "../../../Utils/Constants";
import {useAlerts} from "../../AlertsProvider";


const TracksContext = React.createContext(null);

const TracksProvider = ({children, store}) => {
  const {token} = useUsers();
  const {setAlert} = useAlerts();
  const projectsApi = baseUrl + 'api/v1/projects/';
  const [request, setRequest] = useState(false);


  const createTrack = async (projectId, payload) => {
    setRequest(true)
    const response = await fetch(projectsApi + `${projectId}/tracks/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json();
    if (response.ok) {
      setAlert({message: 'Track successfully created', level: 'success'})

    } else {
      setAlert(data)
    }
    setRequest(false);
  }

  return (
    <TracksContext.Provider
      value={{
        request,
        createTrack
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
