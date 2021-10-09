import {DELETE_PROJECT, SET_INVITE_MEMBER_MODAL, SET_PROJECT, SET_SELECTED_MEMBERS} from "./actionTypes";

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


export const setInviteMemberModal = (state) => ({
  payload: state,
  type: SET_INVITE_MEMBER_MODAL
})
