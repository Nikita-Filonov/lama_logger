import {INITIAL_TRACKS} from './initialState';
import {CREATE_TRACK, SET_TRACKS} from "./actionTypes";


export const tracksReducer = (state = INITIAL_TRACKS, action = {}) => {
  switch (action.type) {
    case SET_TRACKS: {
      return {...state, tracks: action.payload}
    }
    case CREATE_TRACK: {
      return {
        ...state,
        tracks: {...state.tracks, results: [...state.tracks.results, action.payload]}
      }
    }
    default:
      return state;
  }
};
