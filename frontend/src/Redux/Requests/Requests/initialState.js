import {DEFAULT_REQUESTS_FILTERS} from "../../../Utils/Constants";

export const INITIAL_REQUESTS = {
  request: {},
  requests: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  requestsFilters: JSON.parse(localStorage.getItem('requestsFilters')) || DEFAULT_REQUESTS_FILTERS,
  requestsPagination: {
    page: 0,
    rowsPerPage: localStorage.getItem('rowsPerPageRequests') || 25
  },
  requestsStatsFilters: {},
  selectedRequests: [],
  requestsFiltersSidebar: true,
  requestsTimeFilterModal: false,
  requestsRealtime: JSON.parse(localStorage.getItem('requestsRealtime'))
}
