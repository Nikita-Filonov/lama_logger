import React from 'react'
import {Redirect, Route} from 'react-router-dom'

export const PublicRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem('token')

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Redirect to={{pathname: '/projects', state: {from: props.location}}}/>
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}
