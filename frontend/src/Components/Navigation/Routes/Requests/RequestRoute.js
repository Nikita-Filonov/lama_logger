import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import NavigationBar from "../../NavigationBar";
import RequestNavigationDrawer from "../../Drawers/Requests/RequestNavigationDrawer";

export const RequestRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem('token')

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
