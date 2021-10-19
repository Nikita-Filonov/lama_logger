import capitalize from "@mui/utils/capitalize";

export const getProjectName = ({match}) => JSON.parse(localStorage.getItem('project'))?.title
export const getSdkLanguage = ({match}) => capitalize(match?.params?.language);


export const generateProjectPath = (pathname, projectId) => pathname.replace(/[0-9]+/, projectId);
