import {INITIAL_PROJECTS} from './initialState';
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  SET_PROJECT,
  SET_PROJECTS,
  SET_SELECTED_MEMBERS,
  UPDATE_PROJECT
} from "./actionTypes";


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
    case DELETE_PROJECT:
      return {...state, projects: state.projects.filter(p => p.id !== action.payload)}
    case SET_SELECTED_MEMBERS: {
      const {isSelected} = action.payload;
      const {memberId} = action.payload;

      if (!memberId || !isSelected) {
        return {...state, selectedMembers: action.payload}
      }

      if (!isSelected) {
        return {...state, selectedMembers: [...state.selectedMembers, memberId]}
      } else {
        return {...state, selectedMembers: [...state.selectedMembers.filter(r => r !== memberId)]}
      }
    }
    default:
      return state;
  }
};
