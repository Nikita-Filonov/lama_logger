export const INITIAL_STATS = {
  statsFilters: {},
  statsGroupBy: JSON.parse(localStorage.getItem('requestsStatsGroupBy')) || {
    commonStats: 'days',
    numberOfRequests: 'days',
    ratioStatusCodes: 'days'
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
  }
}
