import {INITIAL_USERS} from './initialState';


export const usersReducer = (state = INITIAL_USERS, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
