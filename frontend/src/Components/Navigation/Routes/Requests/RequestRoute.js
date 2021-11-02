import React, {useEffect} from 'react'
import {matchPath, Redirect, Route, useLocation} from 'react-router-dom'
import NavigationBar from "../../NavigationBar";
import RequestNavigationDrawer from "../../Drawers/Requests/RequestNavigationDrawer";
import {useProjects} from "../../../../Providers/ProjectsProvider";
import {REQUESTS_ROUTES} from "../../../../Utils/Constants";
import {useSelector} from "react-redux";

export const RequestRoute = ({component: Component, ...rest}) => {
  const {getProject} = useProjects();
  const {pathname} = useLocation();
  const token = localStorage.getItem('token');

  const storeProject = useSelector(state => state.projects.project);

  useEffect(() => {
    (async () => {
      const props = matchPath(pathname, {path: REQUESTS_ROUTES});
      const projectId = parseInt(props?.params?.projectId);
      ((projectId !== storeProject?.id) && token) && await getProject(projectId);
    })()
  }, [pathname])

  return (
    <React.Fragment>
      <NavigationBar drawer={RequestNavigationDrawer}/>
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
          )
        }
      />
    </React.Fragment>
  )
}
