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
      const {activityIdFrom, activityIdTo, indexTo, service} = action.payload;
      let activities = [...state.activities];
      activities = activities.map(a => a.id === activityIdFrom
        ? {...a, services: a.services.filter(s => s.id !== service.id)}
        : a
      )
      const newActivity = activities.find(a => a.id === activityIdTo)
      newActivity.services.splice(indexTo, 0, service);

      return {...state, activities: [...activities]};
    }
    default:
      return state;
  }
};
