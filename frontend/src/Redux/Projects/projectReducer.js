import {INITIAL_PROJECTS} from './initialState';
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  SET_CREATE_ROLE_MODAL,
  SET_INVITE_MEMBER_MODAL,
  SET_PROJECT,
  SET_PROJECTS,
  SET_ROLE,
  SET_SELECTED_MEMBERS,
  SET_SELECTED_ROLES,
  UPDATE_PROJECT
} from "./actionTypes";


export const projectsReducer = (state = INITIAL_PROJECTS, action = {}) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {...state, projects: action.payload}
    case SET_PROJECT:
      localStorage.setItem('project', JSON.stringify(action.payload));
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

      if (!memberId) {
        return {...state, selectedMembers: action.payload}
      }

      if (!isSelected) {
        return {...state, selectedMembers: [...state.selectedMembers, memberId]}
      } else {
        return {...state, selectedMembers: [...state.selectedMembers.filter(r => r !== memberId)]}
      }
    }
    case SET_SELECTED_ROLES: {
      const {isSelected} = action.payload;
      const {roleId} = action.payload;

      if (!roleId) {
        return {...state, selectedRoles: action.payload}
      }

      if (!isSelected) {
        return {...state, selectedRoles: [...state.selectedRoles, roleId]}
      } else {
        return {...state, selectedRoles: [...state.selectedRoles.filter(r => r !== roleId)]}
      }
    }
    case SET_INVITE_MEMBER_MODAL:
      return {...state, inviteMemberModal: action.payload}
    case SET_CREATE_ROLE_MODAL:
      return {...state, createRoleModal: action.payload}
    case SET_ROLE:
      return {...state, role: action.payload};
    default:
      return state;
  }
};
