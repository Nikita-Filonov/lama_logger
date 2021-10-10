import {DEFAULT_REQUESTS_FILTERS} from "../../Utils/Constants";

export const INITIAL_REQUESTS = {
  request: {},
  requests: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  requestsFilters: JSON.parse(localStorage.getItem('requestsFilters')) || DEFAULT_REQUESTS_FILTERS,
  selectedRequests: [],
  requestsFiltersSidebar: true,
  requestsTimeFilterModal: false
}
