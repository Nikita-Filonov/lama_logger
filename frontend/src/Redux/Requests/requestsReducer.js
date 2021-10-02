import {INITIAL_REQUESTS} from './initialState';
import {CREATE_REQUEST, SET_REQUEST, SET_REQUESTS, SET_REQUESTS_FILTERS} from "./actionTypes";


export const requestsReducer = (state = INITIAL_REQUESTS, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {...state, requests: action.payload}
    case SET_REQUEST:
      return {...state, request: action.payload}
    case CREATE_REQUEST:
      return {...state, requests: [action.payload, ...state.requests]}
    case SET_REQUESTS_FILTERS: {
      return {...state, requestsFilters: action.payload}
    }
    default:
      return state;
  }
};
