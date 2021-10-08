export const INITIAL_USERS = {
  user: {},
  theme: localStorage.getItem('theme') || 'light',
  confirmAction: {
    title: null,
    description: null,
    confirmButton: null,
    action: null
  }
}
