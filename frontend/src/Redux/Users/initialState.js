import {DEFAULT_THEME_SETTINGS, DEFAULT_USER_SETTINGS} from "../../Utils/Constants";

export const INITIAL_USERS = {
  user: {
    email: '',
    username: '',
  },
  drawer: false,
  theme: JSON.parse(localStorage.getItem('theme')) || DEFAULT_THEME_SETTINGS,
  userSettings: JSON.parse(localStorage.getItem('userSettings')) || DEFAULT_USER_SETTINGS,
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
