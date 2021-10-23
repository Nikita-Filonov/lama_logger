import {INITIAL_TRACKS} from './initialState';
import {SET_ACTIVITIES} from "./actionTypes";


export const tracksReducer = (state = INITIAL_TRACKS, action = {}) => {
  switch (action.type) {
    case SET_ACTIVITIES: {
      return {...state, activities: action.payload}
    }
    default:
      return state;
  }
};
