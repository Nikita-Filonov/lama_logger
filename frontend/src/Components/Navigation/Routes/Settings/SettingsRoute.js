import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import NavigationBar from "../../NavigationBar";
import ProjectNavigationDrawer from "../../Drawers/Projects/ProjectNavigationDrawer";
import {Container} from "@mui/material";
import {SettingsSidebar} from "../../../Blocks/Settings/SettingsSidebar";

export const SettingsRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  return (
    <React.Fragment>
      <NavigationBar drawer={ProjectNavigationDrawer}/>
      <Container maxWidth={'xl'}>
        <SettingsSidebar/>
        <div>
          <Route
            {...rest}
            render={props =>
              token ? (
                <React.Fragment>
                  {user
                    ? <Component {...props} />
                    : <Redirect to={{pathname: '/projects', state: {from: props.location}}}/>
                  }
                </React.Fragment>
              ) : (
                <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
              )
            }
          />
        </div>
      </Container>
    </React.Fragment>
  )
}
