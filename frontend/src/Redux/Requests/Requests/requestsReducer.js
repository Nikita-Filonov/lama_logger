import {INITIAL_REQUESTS} from './initialState';
import {
  DELETE_REQUESTS,
  SET_REQUEST,
  SET_REQUESTS,
  SET_REQUESTS_FILTERS,
  SET_REQUESTS_FILTERS_SIDEBAR,
  SET_REQUESTS_PAGINATION,
  SET_REQUESTS_REALTIME,
  SET_REQUESTS_STATS_FILTERS,
  SET_REQUESTS_TIME_FILTER_MODAL,
  SET_SELECTED_REQUESTS
} from "./actionTypes";


export const requestsReducer = (state = INITIAL_REQUESTS, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {...state, requests: action.payload}
    case SET_REQUEST:
      return {...state, request: action.payload}
    case SET_REQUESTS_FILTERS: {
      localStorage.setItem('requestsFilters', JSON.stringify(action.payload))
      return {...state, requestsFilters: action.payload};
    }
    case SET_REQUESTS_PAGINATION: {
      return {...state, requestsPagination: action.payload};
    }
    case DELETE_REQUESTS: {
      const filteredRequests = state.requests.results.filter(r => !action.payload.includes(r.request_id))
      return {...state, requests: {...state.requests, results: filteredRequests}}
    }
    case SET_SELECTED_REQUESTS: {
      const {isSelected} = action.payload;
      const {requestId} = action.payload;

      if (!requestId) {
        return {...state, selectedRequests: action.payload}
      }

      if (!isSelected) {
        return {...state, selectedRequests: [...state.selectedRequests, requestId]}
      } else {
        return {...state, selectedRequests: [...state.selectedRequests.filter(r => r !== requestId)]}
      }
    }
    case SET_REQUESTS_FILTERS_SIDEBAR:
      return {...state, requestsFiltersSidebar: action.payload}
    case SET_REQUESTS_TIME_FILTER_MODAL:
      return {...state, requestsTimeFilterModal: action.payload}
    case SET_REQUESTS_REALTIME: {
      localStorage.setItem('requestsRealtime', action.payload);
      return {...state, requestsRealtime: action.payload}
    }
    case SET_REQUESTS_STATS_FILTERS:
      return {...state, requestsStatsFilters: action.payload};
    default:
      return state;
  }
};