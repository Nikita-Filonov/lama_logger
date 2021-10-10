import {getProjectName} from "./Utils";

export const baseUrl = 'http://localhost:8000/';
export const wsUri = 'ws://localhost:8000/'


export const ROUTES = [
  {path: '/projects/:projectId', breadcrumb: getProjectName},
  {path: '/projects/:projectId/requests', breadcrumb: 'Requests'},
  {path: '/projects/:projectId/settings', breadcrumb: 'Settings'},
  {path: '/projects/:projectId/settings/general', breadcrumb: 'General'},
  {path: '/projects/:projectId/settings/members', breadcrumb: 'Members'},
  {path: '/projects/:projectId/settings/roles', breadcrumb: 'Roles'},
  {path: '/projects', breadcrumb: 'Projects'},
];

export const SUCCESS_CODES = [200, 201, 204];

export const DEFAULT_REQUESTS_FILTERS = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  successes: ['success', 'redirect', 'error']
}
export const REQUESTS_METHODS_FILTERS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
export const REQUESTS_SUCCESSES_FILTERS = [
  {value: 'success', code: 200},
  {value: 'redirect', code: 300},
  {value: 'error', code: 400},
];

export const SIDEBAR_WIDTH = 300;

export const INSTANCES = ['Request', 'Project', 'Member', 'Role']
