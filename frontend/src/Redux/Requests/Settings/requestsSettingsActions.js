import {
  SET_CREATE_ROLE_MODAL,
  SET_CREATE_TASK_MODAL,
  SET_INVITE_MEMBER_MODAL,
  SET_PERIODIC_TASK,
  SET_ROLE,
  SET_SELECTED_MEMBERS,
  SET_SELECTED_ROLES
} from "./actionTypes";


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

export const setCreateTaskModal = (state) => ({
  payload: state,
  type: SET_CREATE_TASK_MODAL
})

export const setRole = (state) => ({
  payload: state,
  type: SET_ROLE
})

export const setPeriodicTask = (state) => ({
  payload: state,
  type: SET_PERIODIC_TASK
})
