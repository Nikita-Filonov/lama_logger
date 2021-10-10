import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import NavigationBar from "../../NavigationBar";
import ProjectNavigationDrawer from "../../Drawers/Projects/ProjectNavigationDrawer";

export const ProjectRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem('token')

  return (
    <React.Fragment>
      <NavigationBar drawer={ProjectNavigationDrawer}/>
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
