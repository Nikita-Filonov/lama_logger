import * as React from 'react';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {useHistory} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {BREADCRUMB_ROUTES} from "../../Utils/Constants";


export const NavigationBreadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(BREADCRUMB_ROUTES);
  const history = useHistory();

  const onLink = (url) => history.push(url)

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" style={{color: '#FFFFFF'}}/>}
    >
      {breadcrumbs
        .slice(1)
        .map(({match, breadcrumb}, index) => (
          <Link
            key={index}
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
