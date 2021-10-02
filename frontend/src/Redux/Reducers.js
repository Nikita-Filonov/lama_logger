import {combineReducers} from 'redux';
import {projectsReducer} from './Projects/projectReducer';
import {requestsReducer} from "./Requests/requestsReducer";


export default combineReducers({
  projects: projectsReducer,
  requests: requestsReducer
});
