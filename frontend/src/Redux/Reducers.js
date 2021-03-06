import {combineReducers} from 'redux';
import {projectsReducer} from './Projects/projectReducer';
import {requestsReducer} from "./Requests/Requests/requestsReducer";
import {usersReducer} from "./Users/usersReducer";
import {requestsSettingsReducer} from "./Requests/Settings/requestsSettingsReducer";
import {tracksReducer} from "./Requests/Tracks/tracksReducer";
import {customRequestsReducer} from "./Requests/CustomRequests/customRequestsReducer";
import {statsReducer} from "./Requests/Stats/statsReducer";


export default combineReducers({
  projects: projectsReducer,
  requests: requestsReducer,
  customRequests: customRequestsReducer,
  requestsSettings: requestsSettingsReducer,
  tracks: tracksReducer,
  stats: statsReducer,
  users: usersReducer,
});
