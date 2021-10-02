import {INITIAL_REQUESTS} from './initialState';
import {SET_REQUEST, SET_REQUESTS} from "./actionTypes";


export const requestsReducer = (state = INITIAL_REQUESTS, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {...state, requests: action.payload}
    case SET_REQUEST:
      return {...state, request: action.payload}
    default:
      return state;
  }
};
