import {INITIAL_CUSTOM_REQUESTS} from "./initialState";
import {
  CREATE_CUSTOM_REQUEST,
  CREATE_CUSTOM_REQUESTS_HISTORY,
  DELETE_CUSTOM_REQUEST,
  SET_CUSTOM_REQUEST,
  SET_CUSTOM_REQUEST_ERROR,
  SET_CUSTOM_REQUEST_HISTORY_PAGINATION,
  SET_CUSTOM_REQUESTS,
  SET_CUSTOM_REQUESTS_HISTORY,
  UPDATE_CUSTOM_REQUEST
} from "./actionTypes";
import {uuid4Sync} from "../../../Utils/Utils/Common";
import moment from "moment";


export const customRequestsReducer = (state = INITIAL_CUSTOM_REQUESTS, action = {}) => {
  switch (action.type) {
    case SET_CUSTOM_REQUESTS:
      return {...state, customRequests: action.payload};
    case SET_CUSTOM_REQUEST:
      localStorage.setItem('customRequest', JSON.stringify(action.payload));
      return {...state, customRequest: action.payload};
    case SET_CUSTOM_REQUEST_ERROR:
      return {...state, customRequestError: action.payload};
    case CREATE_CUSTOM_REQUEST:
      return {
        ...state,
        customRequests: {
          ...state.customRequests,
          count: ++state.customRequests.count,
          results: [...state.customRequests.results, action.payload]
        }
      };
    case UPDATE_CUSTOM_REQUEST: {
      const {requestId, payload} = action.payload;
      return {
        ...state,
        customRequests: {
          ...state.customRequests,
          results: state.customRequests.results.map(request =>
            request.requestId === requestId
              ? payload
              : request
          )
        }
      }
    }
    case DELETE_CUSTOM_REQUEST: {
      const {requestId} = action.payload;
      const results = state.customRequests.results.filter(r => r.requestId !== requestId);
      return {
        ...state,
        customRequests: {...state.customRequests, results}
      }
    }
    case SET_CUSTOM_REQUESTS_HISTORY: {
      return {...state, customRequestsHistory: action.payload};
    }
    case CREATE_CUSTOM_REQUESTS_HISTORY: {
      const {created} = action.payload;
      let results = state.customRequestsHistory.results;

      const targetSection = results.find(section => moment(section.created).isSame(created, 'day'));

      if (targetSection) {
        results = results.map(section =>
          targetSection.id === section.id
            ? {...section, data: [action.payload, ...section.data]}
            : section
        )
      } else {
        results = [{
          id: uuid4Sync(),
          created: moment(created).format('YYYY-MM-DD') + 'T00:00:00Z',
          data: [action.payload]
        }, ...results]
      }

      return {
        ...state,
        count: ++state.customRequestsHistory.count,
        customRequestsHistory: {...state.customRequestsHistory, results}
      };
    }
    case SET_CUSTOM_REQUEST_HISTORY_PAGINATION:
      return {...state, customRequestsHistoryPagination: action.payload};
    default:
      return state;
  }
};
