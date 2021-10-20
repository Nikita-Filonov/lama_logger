import {REQUESTS_METHODS_FILTERS, REQUESTS_STATUS_CODES_FILTERS} from "../../Utils/Constants";

export const INITIAL_PROJECTS = {
  project: JSON.parse(localStorage.getItem('project')) || {},
  projects: [],
  projectSettings: {
    filterStatusCodes: REQUESTS_STATUS_CODES_FILTERS,
    filterMethods: REQUESTS_METHODS_FILTERS
  }
}
