import {combineReducers} from 'redux';
import {projectsReducer} from './Projects/projectReducer';
import {requestsReducer} from "./Requests/requestsReducer";
import {usersReducer} from "./Users/usersReducer";


export default combineReducers({
  projects: projectsReducer,
  requests: requestsReducer,
  users: usersReducer,
});
