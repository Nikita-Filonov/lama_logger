import {
  CREATE_REQUEST,
  SET_REQUEST,
  SET_REQUESTS_FILTERS,
  SET_SELECT_ALL_REQUESTS,
  SET_SELECTED_REQUESTS
} from "./actionTypes";


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

export const setSelectedRequests = (state) => ({
  type: SET_SELECTED_REQUESTS,
  payload: state
})

export const setSelectAllRequests = (state) => ({
  type: SET_SELECT_ALL_REQUESTS,
  payload: state
})
