import {INITIAL_TRACKS} from './initialState';
import {SET_TRACKS} from "./actionTypes";


export const tracksReducer = (state = INITIAL_TRACKS, action = {}) => {
  switch (action.type) {
    case SET_TRACKS: {
      return {...state, tracks: action.payload}
    }
    default:
      return state;
  }
};
