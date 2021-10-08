import {DELETE_PROJECT, SET_PROJECT} from "./actionTypes";

export const setProject = (state) => ({
  payload: state,
  type: SET_PROJECT
})


export const removeProject = (state) => ({
  payload: state,
  type: DELETE_PROJECT
})
