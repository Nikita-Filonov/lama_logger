import python from './../Utils/Integrations/Templates/python.json'
import {getProjectName, getSdkLanguage} from "./Utils/Routing";

export const baseUrl = 'https://lama-logger.herokuapp.com/';


export const BREADCRUMB_ROUTES = [
  {path: '/projects/:projectId', breadcrumb: getProjectName},
  {path: '/projects/:projectId/stats', breadcrumb: 'Stats'},
  {path: '/projects/:projectId/tracks', breadcrumb: 'Tracks'},
  {path: '/projects/:projectId/requests', breadcrumb: 'Requests'},
  {path: '/projects/:projectId/settings', breadcrumb: 'Settings'},
  {path: '/projects/:projectId/requests/send', breadcrumb: 'Send'},
  {path: '/projects/:projectId/settings/general', breadcrumb: 'General'},
  {path: '/projects/:projectId/settings/members', breadcrumb: 'Members'},
  {path: '/projects/:projectId/settings/roles', breadcrumb: 'Roles'},
  {path: '/projects/:projectId/settings/inbound', breadcrumb: 'Inbound Data'},
  {path: '/projects', breadcrumb: 'Projects'},
  {path: '/user', breadcrumb: 'User'},
  {path: '/user/profile', breadcrumb: 'Profile'},
  {path: '/user/tokens', breadcrumb: 'Tokens'},
  {path: '/integrations', breadcrumb: 'Integrations'},
  {path: '/integrations/:language', breadcrumb: getSdkLanguage},
];

export const UNITS = [
  {label: 'Seconds', unit: 'seconds'},
  {label: 'Minutes', unit: 'minutes'},
  {label: 'Hours', unit: 'hours'},
  {label: 'Days', unit: 'days'},
  {label: 'Months', unit: 'months'},
]


export const REQUESTS_METHODS_FILTERS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
export const REQUESTS_STATUS_CODES_FILTERS = {
  success: [100, 101, 200, 201, 202, 203, 204, 205, 206, 208, 226],
  redirect: [300, 301, 302, 303, 304, 305, 306, 307, 308,],
  error: [400, 401, 402, 403, 404, 405, 406, 407, 408,
    409, 410, 411, 412, 413, 414, 415, 416, 418, 422,
    423, 424, 426, 428, 429, 431, 451, 500, 501, 502,
    503, 504, 505, 506, 507, 508, 509, 510, 511]
};
export const DEFAULT_REQUESTS_FILTERS = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  statusCodes: REQUESTS_STATUS_CODES_FILTERS,
  time: {
    type: 'interval',
    interval: {amount: 5, unit: 'hours', prev: 'prev'},
    range: {start: null, end: null}
  }
}


export const REQUESTS_STATUS_CODES_TYPES = [
  {value: 'success', code: 200},
  {value: 'redirect', code: 300},
  {value: 'error', code: 400},
];

export const SIDEBAR_WIDTH = 300;

export const INSTANCES = ['Request', 'Project', 'Member', 'Role'];
export const AVAILABLE_LANGUAGES = [
  {
    language: 'python',
    image: baseUrl + 'static/images/languages/python.png',
    label: 'Python',
    template: python
  },
  {
    language: 'javascript',
    image: baseUrl + 'static/images/languages/javascript.png',
    label: 'Javascript',
    template: python
  },
  {
    language: 'csharp',
    image: baseUrl + 'static/images/languages/csharp.png',
    label: 'C#',
    template: python
  }
]
