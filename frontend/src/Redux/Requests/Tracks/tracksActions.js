import {MOVE_SERVICE, SET_CREATE_TRACK_MODAL, SET_SERVICE} from "./actionTypes";


export const moveService = (state) => ({
  type: MOVE_SERVICE,
  payload: state
})

export const setService = (state) => ({
  type: SET_SERVICE,
  payload: state
})

export const setCreateTrackModal = (state) => ({
  type: SET_CREATE_TRACK_MODAL,
  payload: state
})
