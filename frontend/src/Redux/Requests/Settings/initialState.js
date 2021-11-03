import {INSTANCES} from "../../../Utils/Constants";

export const INITIAL_REQUESTS_SETTINGS = {
  role: {
    name: '',
    scope: INSTANCES.map(inst => `${inst.inst}.View`),
    // TODO Remove this scopes, when View permission support will implemented
    description: '',
    editMode: false
  },
  selectedMembers: [],
  selectedRoles: [],
  periodicTask: {interval: {every: 5, period: 'hours'}, name: '', description: '', task: ''},
  inviteMemberModal: false,
  createRoleModal: false,
  createTaskModal: false,
}
