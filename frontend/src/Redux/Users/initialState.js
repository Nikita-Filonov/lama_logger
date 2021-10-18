export const INITIAL_USERS = {
  user: {
    email: '',
    username: '',
  },
  theme: localStorage.getItem('theme') || 'light',
  confirmAction: {
    title: null,
    description: null,
    confirmButton: null,
    action: null
  }
}
