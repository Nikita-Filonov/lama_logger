import {SET_CONFIRM_ACTION, SET_DRAWER, SET_THEME, SET_VIEW_MODE} from "./actionTypes";

export const setTheme = (state) => ({
  type: SET_THEME,
  payload: state
})

export const setDrawer = (state) => ({
  type: SET_DRAWER,
  payload: state
})

export const setConfirmAction = (state) => ({
  type: SET_CONFIRM_ACTION,
  payload: state
})

export const setViewMode = (state) => ({
  type: SET_VIEW_MODE,
  payload: state
})
