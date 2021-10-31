export const INITIAL_TRACKS = {
  activities: [],
  activity: {},
  service: {},
  track: JSON.parse(localStorage.getItem('track')) || {},
  trackRequests: [],
  createTrackModal: false,
  changeActivityModal: false
}
