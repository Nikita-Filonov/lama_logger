import {SET_CUSTOM_REQUEST, SET_CUSTOM_REQUEST_ERROR, SET_CUSTOM_REQUEST_HISTORY_PAGINATION} from "./actionTypes";


export const setCustomRequest = (state) => ({
  type: SET_CUSTOM_REQUEST,
  payload: state
})

export const setCustomRequestsHistoryPagination = (state) => ({
  type: SET_CUSTOM_REQUEST_HISTORY_PAGINATION,
  payload: state
})

export const setCustomRequestError = (state) => ({
  type: SET_CUSTOM_REQUEST_ERROR,
  payload: state
})
