export const INITIAL_CUSTOM_REQUESTS = {
  customRequests: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  customRequest: JSON.parse(localStorage.getItem('customRequest')) || {
    requestId: null,
    requestHeaders: [],
    requestBody: null
  }
}
