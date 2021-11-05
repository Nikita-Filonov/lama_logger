export const INITIAL_USERS = {
  user: {
    email: '',
    username: '',
  },
  drawer: false,
  theme: localStorage.getItem('theme') || 'light',
  confirmAction: {
    modal: false,
    title: null,
    description: null,
    confirmButton: null,
    action: null
  },
  viewMode: JSON.parse(localStorage.getItem('viewMode')) || {
    requests: 'accordion',
    trackRequests: 'accordion'
  }
}
