import {SET_CONFIRM_ACTION, SET_THEME} from "./actionTypes";

export const setTheme = (state) => ({
  type: SET_THEME,
  payload: state
})

export const setConfirmAction = (state) => ({
  type: SET_CONFIRM_ACTION,
  payload: state
})
