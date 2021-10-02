import {INITIAL_REQUESTS} from './initialState';
import {SET_REQUESTS} from "./actionTypes";


export const requestsReducer = (state = INITIAL_REQUESTS, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {...state, requests: action.payload}
    default:
      return state;
  }
};
