export const INITIAL_STATS = {
  statsFilters: {},
  statsGroupBy: JSON.parse(localStorage.getItem('requestsStatsGroupBy')) || {
    commonStatsChart: 'days'
  },
}
