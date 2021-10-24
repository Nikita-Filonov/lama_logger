import {MOVE_ACTIVITY, MOVE_SERVICE, SET_CREATE_TRACK_MODAL, SET_SERVICE} from "./actionTypes";


export const moveService = (state) => ({
  type: MOVE_SERVICE,
  payload: state
})

export const setService = (state) => ({
  type: SET_SERVICE,
  payload: state
})

export const moveActivity = (state) => (dispatch, getState) => {
  dispatch({
    type: MOVE_ACTIVITY,
    payload: state
  })
  return Promise.resolve(getState());
}

export const setCreateTrackModal = (state) => ({
  type: SET_CREATE_TRACK_MODAL,
  payload: state
})
