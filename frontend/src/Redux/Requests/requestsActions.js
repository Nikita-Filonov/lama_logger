import {CREATE_REQUEST, SET_REQUEST} from "./actionTypes";


export const setRequest = (state) => ({
  type: SET_REQUEST,
  payload: state
})


export const createRequest = (state) => ({
  type: CREATE_REQUEST,
  payload: state
})
