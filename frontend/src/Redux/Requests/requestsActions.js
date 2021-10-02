import {CREATE_REQUEST, SET_REQUEST, SET_REQUESTS_FILTERS} from "./actionTypes";


export const setRequest = (state) => ({
  type: SET_REQUEST,
  payload: state
})


export const createRequest = (state) => ({
  type: CREATE_REQUEST,
  payload: state
})


export const setRequestsFilters = (state) => ({
  type: SET_REQUESTS_FILTERS,
  payload: state
})
