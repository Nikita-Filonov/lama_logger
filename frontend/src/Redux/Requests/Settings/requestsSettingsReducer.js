import {INITIAL_REQUESTS_SETTINGS} from './initialState';
import {
  SET_CREATE_ROLE_MODAL,
  SET_INVITE_MEMBER_MODAL,
  SET_ROLE,
  SET_SELECTED_MEMBERS,
  SET_SELECTED_ROLES,
} from "./actionTypes";


export const requestsSettingsReducer = (state = INITIAL_REQUESTS_SETTINGS, action = {}) => {
  switch (action.type) {
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
