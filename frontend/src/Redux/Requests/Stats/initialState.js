export const INITIAL_STATS = {
  statsFilters: {},
  statsGroupBy: JSON.parse(localStorage.getItem('requestsStatsGroupBy')) || {
    commonStats: 'days',
    ratioStatusCodes: 'days'
  },
  ratioStatusCodes: {
    labels: [],
    datasets: [
      {
        data: [],
        label: null,
        spanGaps: true
      }
    ]
  }
}
