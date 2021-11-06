import {INITIAL_USERS} from './initialState';
import {SET_CONFIRM_ACTION, SET_DRAWER, SET_THEME, SET_USER, SET_USER_SETTINGS, SET_VIEW_MODE} from "./actionTypes";


export const usersReducer = (state = INITIAL_USERS, action = {}) => {
  switch (action.type) {
    case SET_THEME:
      return {...state, theme: action.payload};
    case SET_DRAWER:
      return {...state, drawer: action.payload};
    case SET_CONFIRM_ACTION:
      return {...state, confirmAction: action.payload};
    case SET_USER: {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {...state, user: action.payload};
    }
    case SET_USER_SETTINGS: {
      localStorage.setItem('userSettings', JSON.stringify(action.payload));
      return {...state, userSettings: action.payload};
    }
    case SET_VIEW_MODE: {
      localStorage.setItem('viewMode', JSON.stringify(action.payload));
      return {...state, viewMode: action.payload};
    }
    default:
      return state;
  }
};
