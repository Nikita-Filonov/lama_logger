import {INITIAL_REQUESTS} from './initialState';
import {
  CREATE_SAVED_REQUESTS_FILTER,
  DELETE_REQUESTS,
  DELETE_SAVED_REQUESTS_FILTER,
  SET_REQUEST,
  SET_REQUEST_CHAIN,
  SET_REQUEST_CHAIN_ERROR,
  SET_REQUESTS,
  SET_REQUESTS_CHAIN,
  SET_REQUESTS_FILTERS,
  SET_REQUESTS_FILTERS_SIDEBAR,
  SET_REQUESTS_NODE_CHAIN_MODAL,
  SET_REQUESTS_PAGINATION,
  SET_REQUESTS_REALTIME,
  SET_REQUESTS_TIME_FILTER_MODAL,
  SET_SAVED_REQUESTS_FILTERS,
  SET_SELECTED_REQUESTS,
  UPDATE_REQUEST,
  UPDATE_REQUEST_CHAIN
} from "./actionTypes";


export const requestsReducer = (state = INITIAL_REQUESTS, action = {}) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {...state, requests: action.payload}
    case SET_REQUEST: {
      localStorage.setItem('request', JSON.stringify(action.payload))
      return {...state, request: action.payload};
    }
    case SET_REQUESTS_FILTERS: {
      localStorage.setItem('requestsFilters', JSON.stringify(action.payload))
      return {...state, requestsFilters: action.payload};
    }
    case SET_REQUESTS_PAGINATION: {
      return {...state, requestsPagination: action.payload};
    }
    case DELETE_REQUESTS: {
      const filteredRequests = state.requests.results.filter(r => !action.payload.includes(r.requestId))
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
    case SET_REQUESTS_FILTERS_SIDEBAR: {
      localStorage.setItem('requestsFiltersSidebar', JSON.stringify(action.payload));
      return {...state, requestsFiltersSidebar: action.payload};
    }
    case SET_REQUESTS_TIME_FILTER_MODAL:
      return {...state, requestsTimeFilterModal: action.payload};
    case SET_REQUESTS_NODE_CHAIN_MODAL:
      return {...state, requestsNodeChainModal: action.payload};
    case SET_REQUESTS_REALTIME: {
      localStorage.setItem('requestsRealtime', JSON.stringify(action.payload));
      return {...state, requestsRealtime: action.payload}
    }
    case SET_REQUESTS_CHAIN:
      return {...state, requestsChain: action.payload};
    case SET_REQUEST_CHAIN:
      return {...state, requestChain: action.payload};
    case SET_SAVED_REQUESTS_FILTERS:
      return {...state, savedRequestsFilters: action.payload};
    case CREATE_SAVED_REQUESTS_FILTER:
      return {...state, savedRequestsFilters: [...state.savedRequestsFilters, action.payload]}
    case DELETE_SAVED_REQUESTS_FILTER: {
      const {filterId} = action.payload;
      return {...state, savedRequestsFilters: state.savedRequestsFilters.filter(filter => filter.id !== filterId)}
    }
    case UPDATE_REQUEST: {
      const {requestId, payload} = action.payload;
      return {
        ...state,
        requests: {
          ...state.requests,
          results: state.requests.results.map(request =>
            request.requestId === requestId
              ? payload
              : request
          )
        },
        request: requestId === state.request?.requestId ? payload : state.request
      }
    }
    case UPDATE_REQUEST_CHAIN: {
      const {requestId, payload} = action.payload;
      return {
        ...state,
        requestsChain: state.requestsChain.map(request => request.requestId === requestId ? payload : request)
      }
    }
    case SET_REQUEST_CHAIN_ERROR:
      return {...state, requestChainError: action.payload};
    default:
      return state;
  }
};
