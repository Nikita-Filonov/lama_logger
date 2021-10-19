export const INITIAL_USERS = {
  user: {
    email: '',
    username: '',
  },
  theme: localStorage.getItem('theme') || 'light',
  confirmAction: {
    modal: false,
    title: null,
    description: null,
    confirmButton: null,
    action: null
  }
}
