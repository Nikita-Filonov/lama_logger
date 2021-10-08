import {INITIAL_USERS} from './initialState';
import {SET_CONFIRM_ACTION, SET_THEME} from "./actionTypes";


export const usersReducer = (state = INITIAL_USERS, action = {}) => {
  switch (action.type) {
    case SET_THEME:
      return {...state, theme: action.payload};
    case SET_CONFIRM_ACTION:
      return {...state, confirmAction: action.payload};
    default:
      return state;
  }
};
