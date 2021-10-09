export const baseUrl = 'http://localhost:8000/';
export const wsUri = 'ws://localhost:8000/'

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
