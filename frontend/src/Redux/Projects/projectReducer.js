import {INITIAL_PROJECTS} from './initialState';
import {CREATE_PROJECT, SET_PROJECTS} from "./actionTypes";


export const projectsReducer = (state = INITIAL_PROJECTS, action = {}) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {...state, projects: action.payload}
    case CREATE_PROJECT:
      return {...state, projects: [...state.projects, action.payload]}
    default:
      return state;
  }
};
