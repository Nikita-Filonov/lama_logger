import {getProjectName} from "./Untils/Routing";

export const baseUrl = 'http://localhost:8000/';
export const wsUri = 'ws://localhost:8000/'


export const ROUTES = [
  {path: '/projects/:projectId', breadcrumb: getProjectName},
  {path: '/projects/:projectId/stats', breadcrumb: 'Stats'},
  {path: '/projects/:projectId/requests', breadcrumb: 'Requests'},
  {path: '/projects/:projectId/settings', breadcrumb: 'Settings'},
  {path: '/projects/:projectId/settings/general', breadcrumb: 'General'},
  {path: '/projects/:projectId/settings/members', breadcrumb: 'Members'},
  {path: '/projects/:projectId/settings/roles', breadcrumb: 'Roles'},
  {path: '/projects', breadcrumb: 'Projects'},
];

export const SUCCESS_CODES = [200, 201, 204];
export const CODES = {
  success: [100, 101, 200, 201, 202, 203, 204, 205, 206, 208, 226],
  redirect: [300, 301, 302, 303, 304, 305, 306, 307, 308,],
  error: [400, 401, 402, 403, 404, 405, 406, 407, 408,
    409, 410, 411, 412, 413, 414, 415, 416, 418, 422,
    423, 424, 426, 428, 429, 431, 451, 500, 501, 502,
    503, 504, 505, 506, 507, 508, 509, 510, 511]
};
export const UNITS = [
  {label: 'Seconds', unit: 'seconds'},
  {label: 'Minutes', unit: 'minutes'},
  {label: 'Hours', unit: 'hours'},
  {label: 'Days', unit: 'days'},
  {label: 'Months', unit: 'months'},
]

export const DEFAULT_REQUESTS_FILTERS = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  successes: ['success', 'redirect', 'error'],
  time: {
    type: 'interval',
    interval: {amount: 5, unit: 'hours', prev: 'prev'},
    range: {start: null, end: null}
  }
}
export const REQUESTS_METHODS_FILTERS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
export const REQUESTS_SUCCESSES_FILTERS = [
  {value: 'success', code: 200},
  {value: 'redirect', code: 300},
  {value: 'error', code: 400},
];

export const SIDEBAR_WIDTH = 300;

export const INSTANCES = ['Request', 'Project', 'Member', 'Role'];
