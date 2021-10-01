import {combineReducers} from 'redux';
import {projectsReducer} from './Projects/projectReducer';


export default combineReducers({
  projects: projectsReducer,
});
