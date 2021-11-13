import {INITIAL_STATS} from './initialState';
import {SET_RATIO_STATUS_CODES, SET_STATS_FILTERS, SET_STATS_GROUP_BY} from "./actionTypes";


export const statsReducer = (state = INITIAL_STATS, action = {}) => {
  switch (action.type) {
    case SET_STATS_FILTERS:
      return {...state, statsFilters: action.payload};
    case SET_STATS_GROUP_BY:
      localStorage.setItem('statsGroupBy', JSON.stringify(action.payload));
      return {...state, statsGroupBy: action.payload};
    case SET_RATIO_STATUS_CODES:
      return {...state, ratioStatusCodes: action.payload};
    default:
      return state;
  }
};
