export const INITIAL_CUSTOM_REQUESTS = {
  customRequests: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  customRequestsHistory: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  customRequestsHistoryPagination: {
    page: 0,
    rowsPerPage: 25
  },
  customRequest: JSON.parse(localStorage.getItem('customRequest')) || {
    requestId: null,
    requestHeaders: [],
    queryParams: [],
    requestBody: null,
    requestUrl: null,
    responseHeaders: {},
    responseBody: null
  },
  customRequestError: {
    level: 'error',
    data: null
  },
}
