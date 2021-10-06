import {DEFAULT_REQUESTS_FILTERS} from "../../Utils/Constants";

export const INITIAL_REQUESTS = {
  request: {},
  requests: [],
  requestsFilters: JSON.parse(localStorage.getItem('filters')) || DEFAULT_REQUESTS_FILTERS,
  selectedRequests: [],
  requestsFiltersSidebar: true
}
