import {CODES, REQUESTS_METHODS_FILTERS} from "../../Utils/Constants";

export const INITIAL_PROJECTS = {
  project: JSON.parse(localStorage.getItem('project')) || {},
  projects: [],
  projectSettings: {
    filterStatusCodes: CODES,
    filterMethods: REQUESTS_METHODS_FILTERS
  }
}
