import {DEFAULT_REALTIME_SETTINGS, DEFAULT_REQUESTS_FILTERS, REQUESTS_PAGINATION} from "../../../Utils/Constants";

export const INITIAL_REQUESTS = {
  request: JSON.parse(localStorage.getItem('request')) || {},
  requests: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  savedRequestsFilters: [],
  requestsFilters: JSON.parse(localStorage.getItem('requestsFilters')) || DEFAULT_REQUESTS_FILTERS,
  requestsPagination: {
    page: 0,
    rowsPerPage: localStorage.getItem(REQUESTS_PAGINATION) || 25
  },
  selectedRequests: [],
  requestsFiltersSidebar: localStorage.getItem('requestsFiltersSidebar') !== 'false',
  requestsTimeFilterModal: false,
  requestsRealtime: JSON.parse(localStorage.getItem('requestsRealtime')) || DEFAULT_REALTIME_SETTINGS
}
