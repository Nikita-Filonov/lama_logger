export const INITIAL_REQUESTS = {
  request: {},
  requests: [],
  requestsFilters: {
    methods: JSON.parse(localStorage.getItem('methods')) || ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    successes: JSON.parse(localStorage.getItem('successes')) || ['success', 'redirect', 'error']
  }
}
