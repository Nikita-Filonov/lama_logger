export const INITIAL_PROJECTS = {
  project: JSON.parse(localStorage.getItem('project')) || {},
  projects: [],
  role: {name: '', scope: [], description: '', editMode: false},
  selectedMembers: [],
  selectedRoles: [],
  inviteMemberModal: false,
  createRoleModal: false,
}
