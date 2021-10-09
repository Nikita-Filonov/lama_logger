import {
  DELETE_PROJECT,
  SET_CREATE_ROLE_MODAL,
  SET_INVITE_MEMBER_MODAL,
  SET_PROJECT,
  SET_ROLE,
  SET_SELECTED_MEMBERS,
  SET_SELECTED_ROLES
} from "./actionTypes";

export const setProject = (state) => ({
  payload: state,
  type: SET_PROJECT
})


export const removeProject = (state) => ({
  payload: state,
  type: DELETE_PROJECT
})


export const setSelectedMembers = (state) => ({
  payload: state,
  type: SET_SELECTED_MEMBERS
})

export const setSelectedRoles = (state) => ({
  payload: state,
  type: SET_SELECTED_ROLES
})


export const setInviteMemberModal = (state) => ({
  payload: state,
  type: SET_INVITE_MEMBER_MODAL
})

export const setCreateRoleModal = (state) => ({
  payload: state,
  type: SET_CREATE_ROLE_MODAL
})

export const setRole = (state) => ({
  payload: state,
  type: SET_ROLE
})
