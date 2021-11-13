export const INITIAL_STATS = {
  statsFilters: {},
  statsGroupBy: JSON.parse(localStorage.getItem('statsGroupBy')) || {
    commonStats: 'days',
    numberOfRequests: 'days',
    ratioStatusCodes: 'days',
    responseTime: 'days',
  },
  requestsStats: {
    total: null,
    create: null,
    delete: null,
    filter: null,
  },
  ratioStatusCodes: {
    labels: [],
    datasets: []
  },
  numberOfRequests: {
    labels: [],
    datasets: []
  },
  responseTime: {
    labels: [],
    datasets: []
  }
}
