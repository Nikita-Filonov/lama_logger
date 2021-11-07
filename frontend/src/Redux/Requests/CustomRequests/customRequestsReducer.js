import {INITIAL_CUSTOM_REQUESTS} from "./initialState";
import {
  CREATE_CUSTOM_REQUEST,
  DELETE_CUSTOM_REQUEST,
  SET_CUSTOM_REQUEST,
  SET_CUSTOM_REQUESTS,
  UPDATE_CUSTOM_REQUEST
} from "./actionTypes";


export const customRequestsReducer = (state = INITIAL_CUSTOM_REQUESTS, action = {}) => {
  switch (action.type) {
    case SET_CUSTOM_REQUESTS:
      return {...state, customRequests: action.payload};
    case SET_CUSTOM_REQUEST:
      localStorage.setItem('customRequest', JSON.stringify(action.payload));
      return {...state, customRequest: action.payload};
    case CREATE_CUSTOM_REQUEST:
      return {
        ...state,
        customRequests: {
          ...state.customRequests,
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
    default:
      return state;
  }
};
