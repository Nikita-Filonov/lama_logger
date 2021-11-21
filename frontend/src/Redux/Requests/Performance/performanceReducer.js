import {INITIAL_PERFORMANCE} from "./initialState";
import {SET_TRANSACTIONS} from "./actionTypes";


export const customRequestsReducer = (state = INITIAL_PERFORMANCE, action = {}) => {
  switch (action.type) {
    case SET_TRANSACTIONS:
      return {...state, transactions: action.payload};
    default:
      return state;
  }
};
