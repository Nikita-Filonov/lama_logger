import {INITIAL_REQUESTS_SEND} from './initialState';
import {SET_REQUESTS_SEND} from "./actionTypes";


export const requestsReducer = (state = INITIAL_REQUESTS_SEND, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS_SEND:
      return {...state, requestsSend: action.payload}
    default:
      return state;
  }
};
