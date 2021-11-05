import {INITIAL_CUSTOM_REQUESTS} from "./initialState";
import {SET_CUSTOM_REQUEST, SET_CUSTOM_REQUESTS} from "./actionTypes";


export const customRequestsReducer = (state = INITIAL_CUSTOM_REQUESTS, action = {}) => {
  switch (action.type) {
    case SET_CUSTOM_REQUESTS:
      return {...state, customRequests: action.payload};
    case SET_CUSTOM_REQUEST:
      return {...state, customRequest: action.payload};
    default:
      return state;
  }
};
