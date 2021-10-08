import {INITIAL_PROJECTS} from './initialState';
import {CREATE_PROJECT, SET_PROJECT, SET_PROJECTS, UPDATE_PROJECT} from "./actionTypes";


export const projectsReducer = (state = INITIAL_PROJECTS, action = {}) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {...state, projects: action.payload}
    case SET_PROJECT:
      return {...state, project: action.payload}
    case CREATE_PROJECT:
      return {...state, projects: [...state.projects, action.payload]}
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(p => p.id === action.payload.id ? action.payload : p)
      }
    default:
      return state;
  }
};
