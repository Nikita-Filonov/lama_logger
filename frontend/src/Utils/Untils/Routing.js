export const getProjectName = ({match}) => JSON.parse(localStorage.getItem('project'))?.title


export const generateProjectPath = (pathname, projectId) => pathname.replace(/[0-9]+/, projectId);
