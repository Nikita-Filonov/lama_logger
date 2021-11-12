import {SET_STATS_FILTERS, SET_STATS_GROUP_BY} from "./actionTypes";

export const setStatsFilters = (state) => ({
  type: SET_STATS_FILTERS,
  payload: state
})


export const setStatsGroupBy = (state) => ({
  type: SET_STATS_GROUP_BY,
  payload: state
})
