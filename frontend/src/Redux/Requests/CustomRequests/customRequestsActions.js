import {SET_CUSTOM_REQUEST, SET_CUSTOM_REQUEST_HISTORY_PAGINATION} from "./actionTypes";


export const setCustomRequest = (state) => ({
  type: SET_CUSTOM_REQUEST,
  payload: state
})

export const setCustomRequestsHistoryPagination = (state) => ({
  type: SET_CUSTOM_REQUEST_HISTORY_PAGINATION,
  payload: state
})
