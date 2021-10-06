import {INITIAL_REQUESTS} from './initialState';
import {
  CREATE_REQUEST,
  DELETE_REQUESTS,
  SET_REQUEST,
  SET_REQUESTS,
  SET_REQUESTS_FILTERS,
  SET_REQUESTS_FILTERS_SIDEBAR,
  SET_REQUESTS_TIME_FILTER_MODAL,
  SET_SELECT_ALL_REQUESTS,
  SET_SELECTED_REQUESTS
} from "./actionTypes";


export const requestsReducer = (state = INITIAL_REQUESTS, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {...state, requests: action.payload}
    case SET_REQUEST:
      return {...state, request: action.payload}
    case CREATE_REQUEST:
      return {...state, requests: [action.payload, ...state.requests]}
    case SET_REQUESTS_FILTERS: {
      return {...state, requestsFilters: action.payload}
    }
    case DELETE_REQUESTS: {
      const filteredRequests = state.requests.filter(r => !action.payload.includes(r.id))
      return {...state, requests: [...filteredRequests]}
    }
    case SET_SELECTED_REQUESTS: {
      const {isSelected} = action.payload;
      const {requestId} = action.payload;

      if (!isSelected) {
        return {...state, selectedRequests: [...state.selectedRequests, requestId]}
      } else {
        return {...state, selectedRequests: [...state.selectedRequests.filter(r => r !== requestId)]}
      }
    }
    case SET_SELECT_ALL_REQUESTS: {
      return {...state, selectedRequests: action.payload}
    }
    case SET_REQUESTS_FILTERS_SIDEBAR:
      return {...state, requestsFiltersSidebar: action.payload}
    case SET_REQUESTS_TIME_FILTER_MODAL:
      return {...state, requestsTimeFilterModal: action.payload}
    default:
      return state;
  }
};
