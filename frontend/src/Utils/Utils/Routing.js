import capitalize from "@mui/utils/capitalize";

export const getProjectName = ({match}) => JSON.parse(localStorage.getItem('project'))?.title || match?.params?.projectId
export const getSdkLanguage = ({match}) => capitalize(match?.params?.language);
export const getTrackName = ({match}) => JSON.parse(localStorage.getItem('track'))?.endpoint || match?.params?.trackId


export const generateProjectPath = (pathname, projectId) => pathname.replace(/[0-9]+/, projectId);


export const getMatchesRequestsSettingsRoute = (route) => {
  if (route.endsWith('/settings/members')) {
    return 'users';
  }

  if (route.endsWith('/settings/roles')) {
    return 'users';
  }

  if (route.endsWith('/settings/inbound')) {
    return 'requests';
  }

  if (route.endsWith('/settings/filters')) {
    return 'requests';
  }
}


export const getMatchesSettingsRoute = (route: string) => {
  const routes = {
    '/settings/json-editor': 'customRequests',
    '/settings/headers': 'customRequests',
    '/settings/theme': 'theme',
  }
  const matchRoute = Object.keys(routes).find(r => route.startsWith(r));
  return routes[matchRoute];
}
