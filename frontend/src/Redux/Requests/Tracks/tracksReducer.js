import {INITIAL_TRACKS} from './initialState';
import {
  CREATE_ACTIVITY,
  CREATE_SERVICE,
  CREATE_TRACK,
  DELETE_ACTIVITY,
  MOVE_ACTIVITY,
  MOVE_SERVICE,
  SET_ACTIVITIES,
  SET_ACTIVITY,
  SET_CHANGE_ACTIVITY_MODAL,
  SET_CREATE_TRACK_MODAL,
  SET_SERVICE,
  SET_TRACK,
  SET_TRACK_REQUESTS,
  UPDATE_ACTIVITY
} from "./actionTypes";


export const tracksReducer = (state = INITIAL_TRACKS, action = {}) => {
  switch (action.type) {
    case SET_ACTIVITIES: {
      return {...state, activities: action.payload};
    }
    case SET_ACTIVITY: {
      return {...state, activity: action.payload};
    }
    case CREATE_ACTIVITY: {
      return {...state, activities: [...state.activities, action.payload]};
    }
    case MOVE_ACTIVITY: {
      const {indexFrom, indexTo} = action.payload;
      const activities = [...state.activities];

      const [removed] = activities.splice(indexFrom, 1);
      activities.splice(indexTo, 0, removed);
      return {...state, activities};
    }
    case DELETE_ACTIVITY: {
      const {activityId} = action.payload;

      return {...state, activities: state.activities.filter(a => a.id !== activityId)};
    }
    case CREATE_SERVICE: {
      const {activityId} = action.payload;
      return {
        ...state,
        activities: state.activities.map(a =>
          a.id === activityId ? {...a, services: [...a.services, action.payload.service]} : a
        )
      }
    }
    case UPDATE_ACTIVITY: {
      return {...state, activities: state.activities.map(a => a.id === action.payload.id ? action.payload : a)}
    }
    case MOVE_SERVICE: {
      const {activityIdFrom, activityIdTo, indexTo, indexFrom, service} = action.payload;
      let activities = [...state.activities];

      const fromActivity = activities.find(a => a.id === activityIdFrom)
      fromActivity.services.splice(indexFrom, 1);

      const toActivity = activities.find(a => a.id === activityIdTo)
      toActivity.services.splice(indexTo, 0, service);

      return {...state, activities: [...activities]};
    }
    case SET_CREATE_TRACK_MODAL:
      return {...state, createTrackModal: action.payload};
    case SET_CHANGE_ACTIVITY_MODAL: {
      return {...state, changeActivityModal: action.payload};
    }
    case SET_SERVICE:
      return {...state, service: action.payload};
    case SET_TRACK: {
      localStorage.setItem('track', JSON.stringify(action.payload));
      return {...state, track: {...action.payload}};
    }
    case CREATE_TRACK:
      const {serviceId, track} = action.payload;
      let activities = [...state.activities];
      const activity = activities.find(a => a.services.some(s => s.id === serviceId));

      activities = activities.map(a =>
        a.id === activity.id
          ? {
            ...a, services: a.services.map(s =>
              s.id === serviceId
                ? {...s, tracks: [...s.tracks, track]}
                : s
            )
          }
          : a
      )

      return {...state, activities: [...activities]}
    case SET_TRACK_REQUESTS:
      return {...state, trackRequests: action.payload};
    default:
      return state;
  }
};
