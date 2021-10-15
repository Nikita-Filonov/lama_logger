import {combineReducers} from 'redux';
import {projectsReducer} from './Projects/projectReducer';
import {requestsReducer} from "./Requests/Requests/requestsReducer";
import {usersReducer} from "./Users/usersReducer";
import {requestsSettingsReducer} from "./Requests/Settings/requestsSettingsReducer";


export default combineReducers({
  projects: projectsReducer,
  requests: requestsReducer,
  requestsSettings: requestsSettingsReducer,
  users: usersReducer,
});
