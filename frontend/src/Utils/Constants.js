import python from './../Utils/Integrations/Templates/python.json'
import {getProjectName, getSdkLanguage, getTrackName} from "./Utils/Routing";

export const baseUrl = 'http://localhost:8000/';


export const BREADCRUMB_ROUTES = [
  {path: '/projects/:projectId', breadcrumb: getProjectName},
  {path: '/projects/:projectId/stats', breadcrumb: 'Stats'},
  {path: '/projects/:projectId/tracks', breadcrumb: 'Tracks'},
  {path: '/projects/:projectId/tracks/:trackId', breadcrumb: getTrackName},
  {path: '/projects/:projectId/requests', breadcrumb: 'Requests'},
  {path: '/projects/:projectId/settings', breadcrumb: 'Settings'},
  {path: '/projects/:projectId/requests/send', breadcrumb: 'Send'},
  {path: '/projects/:projectId/settings/general', breadcrumb: 'General'},
  {path: '/projects/:projectId/settings/members', breadcrumb: 'Members'},
  {path: '/projects/:projectId/settings/roles', breadcrumb: 'Roles'},
  {path: '/projects/:projectId/settings/inbound', breadcrumb: 'Inbound Data'},
  {path: '/projects/:projectId/settings/integrations', breadcrumb: 'Integrations'},
  {path: '/projects/:projectId/settings/filters', breadcrumb: 'Filters'},
  {path: '/projects/:projectId/settings/realtime', breadcrumb: 'Realtime'},
  {path: '/projects/:projectId/settings/activities', breadcrumb: 'Activities'},
  {path: '/projects/:projectId/settings/patterns', breadcrumb: 'Patterns'},
  {path: '/projects/:projectId/settings/notifications', breadcrumb: 'Notifications'},
  {path: '/projects/:projectId/settings/tasks', breadcrumb: 'Tasks'},
  {path: '/projects', breadcrumb: 'Projects'},
  {path: '/user', breadcrumb: 'User'},
  {path: '/user/profile', breadcrumb: 'Profile'},
  {path: '/user/tokens', breadcrumb: 'Tokens'},
  {path: '/integrations', breadcrumb: 'Integrations'},
  {path: '/integrations/:language', breadcrumb: getSdkLanguage},
  {path: '/settings/theme', breadcrumb: 'Theme'},
  {path: '/settings/json-editor', breadcrumb: 'Json editor'}
];

export const REQUESTS_ROUTES = [
  '/projects/:projectId',
  '/projects/:projectId/stats',
  '/projects/:projectId/tracks',
  '/projects/:projectId/tracks/:trackId',
  '/projects/:projectId/requests',
  '/projects/:projectId/settings',
  '/projects/:projectId/requests/send',
  '/projects/:projectId/settings/general',
  '/projects/:projectId/settings/members',
  '/projects/:projectId/settings/roles',
  '/projects/:projectId/settings/inbound'
]

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
  },
  domain: null,
  headers: [],
  body: {responseBody: null, requestBody: null}
}
export const DEFAULT_REALTIME_SETTINGS = {
  unit: 'seconds',
  amount: 10,
  normalizedAmount: 10,
  enabled: false
}


export const REQUESTS_STATUS_CODES_TYPES = [
  {value: 'success', code: 200},
  {value: 'redirect', code: 300},
  {value: 'error', code: 400},
];

export const SIDEBAR_WIDTH = 300;

export const INSTANCES = [
  {label: 'Requests', inst: 'Request'},
  {label: 'Projects', inst: 'Project'},
  {label: 'Members', inst: 'Member'},
  {label: 'Roles', inst: 'Role'},
  {label: 'Tasks', inst: 'ProjectTask'},
  {label: 'Project settings', inst: 'ProjectSettings'},
  {label: 'Requests filters', inst: 'RequestsFilter'},
  {label: 'Tracks', inst: 'Track'},
  {label: 'Services', inst: 'Service'},
  {label: 'Activity', inst: 'ServiceActivity'},
  {label: 'Tracked requests', inst: 'TrackRequest'}
];
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

export const AVAILABLE_TASKS = [
  {task: 'core.projects.tasks.cleaners.clear_requests', label: 'Clear requests'}
]

export const METHOD_COLORS = {
  'GET': '#61AFFE',
  'POST': '#49CC90',
  'PUT': '#FCA130',
  'PATCH': '#50E3C2',
  'DELETE': '#F93E3E'
}

export const CUSTOM_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
