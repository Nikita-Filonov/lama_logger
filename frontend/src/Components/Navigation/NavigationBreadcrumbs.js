import * as React from 'react';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {useHistory} from "react-router-dom";

const getProjectName = ({match}) => JSON.parse(localStorage.getItem('project'))?.title


const routes = [
  {path: '/projects/:projectId', breadcrumb: getProjectName},
  {path: '/projects/:projectId/requests', breadcrumb: 'Requests'},
  {path: '/projects/:projectId/settings', breadcrumb: 'Settings'},
  {path: '/projects/:projectId/settings/general', breadcrumb: 'General'},
  {path: '/projects/:projectId/settings/members', breadcrumb: 'Members'},
  {path: '/projects/:projectId/settings/roles', breadcrumb: 'Roles'},
  {path: '/projects', breadcrumb: 'Projects'},
];

export const NavigationBreadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);
  const history = useHistory();

  const onLink = (url) => history.push(url)

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs
        .slice(1)
        .map(({match, breadcrumb}) => (
          <Link
            sx={{color: '#FFFFFF'}}
            to={match.url}
            onClick={() => onLink(match.url)}
          >
            {breadcrumb}
          </Link>
        ))}
    </Breadcrumbs>
  );
}
