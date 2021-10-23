import {INITIAL_TRACKS} from './initialState';
import {CREATE_SERVICE, MOVE_SERVICE, SET_ACTIVITIES} from "./actionTypes";


export const tracksReducer = (state = INITIAL_TRACKS, action = {}) => {
  switch (action.type) {
    case SET_ACTIVITIES: {
      return {...state, activities: action.payload}
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
    case MOVE_SERVICE: {
      const {activityIdFrom, activityIdTo, indexTo, indexFrom, service} = action.payload;
      let activities = [...state.activities];

      const fromActivity = activities.find(a => a.id === activityIdFrom)
      fromActivity.services.splice(indexFrom, 1);

      const toActivity = activities.find(a => a.id === activityIdTo)
      toActivity.services.splice(indexTo, 0, service);

      return {...state, activities: [...activities]};
    }
    default:
      return state;
  }
};
