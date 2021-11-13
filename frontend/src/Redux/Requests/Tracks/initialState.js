import {TRACK_REQUESTS_PAGINATION} from "../../../Utils/Constants";

export const INITIAL_TRACKS = {
  activities: [],
  activity: {},
  service: {},
  track: JSON.parse(localStorage.getItem('track')) || {},
  trackRequests: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  trackRequest: JSON.parse(localStorage.getItem('trackRequest')) || {},
  trackRequestsPagination: {
    page: 0,
    rowsPerPage: localStorage.getItem(TRACK_REQUESTS_PAGINATION) || 25
  },
  createTrackModal: false,
  changeActivityModal: false
}
