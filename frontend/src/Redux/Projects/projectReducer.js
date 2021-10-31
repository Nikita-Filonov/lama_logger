import {INITIAL_PROJECTS} from './initialState';
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  SET_PROJECT,
  SET_PROJECT_SETTINGS,
  SET_PROJECTS,
  UPDATE_PROJECT
} from "./actionTypes";


export const projectsReducer = (state = INITIAL_PROJECTS, action = {}) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {...state, projects: action.payload}
    case SET_PROJECT:
      localStorage.setItem('project', JSON.stringify(action.payload));
      return {...state, project: {...action.payload}};
    case CREATE_PROJECT:
      return {...state, projects: [...state.projects, action.payload]}
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(p => p.id === action.payload.id ? action.payload : p)
      }
    case DELETE_PROJECT:
      return {...state, projects: state.projects.filter(p => p.id !== action.payload)}
    case SET_PROJECT_SETTINGS:
      return {...state, projectSettings: action.payload};
    default:
      return state;
  }
};
