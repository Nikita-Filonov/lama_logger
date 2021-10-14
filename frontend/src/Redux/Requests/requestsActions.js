import {
  SET_REQUEST,
  SET_REQUESTS_FILTERS,
  SET_REQUESTS_FILTERS_SIDEBAR,
  SET_REQUESTS_PAGINATION,
  SET_REQUESTS_REALTIME,
  SET_REQUESTS_TIME_FILTER_MODAL,
  SET_SELECTED_REQUESTS
} from "./actionTypes";


export const setRequest = (state) => ({
  type: SET_REQUEST,
  payload: state
})


export const setRequestsFilters = (state) => ({
  type: SET_REQUESTS_FILTERS,
  payload: state
})

export const setRequestsPagination = (state) => ({
  type: SET_REQUESTS_PAGINATION,
  payload: state
})

export const setSelectedRequests = (state) => ({
  type: SET_SELECTED_REQUESTS,
  payload: state
})

export const setRequestsFiltersSidebar = (state) => ({
  type: SET_REQUESTS_FILTERS_SIDEBAR,
  payload: state
})

export const setRequestsTimeFilterModal = (state) => ({
  type: SET_REQUESTS_TIME_FILTER_MODAL,
  payload: state
})

export const setRequestsRealtime = (state) => ({
  type: SET_REQUESTS_REALTIME,
  payload: state
})
