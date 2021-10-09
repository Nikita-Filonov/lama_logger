export const INITIAL_PROJECTS = {
  project: JSON.parse(localStorage.getItem('project')) || {},
  projects: [],
  selectedMembers: [],
  selectedRoles: [],
  inviteMemberModal: false
}
