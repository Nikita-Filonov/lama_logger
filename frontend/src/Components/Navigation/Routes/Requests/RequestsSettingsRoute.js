import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {Container} from "@mui/material";
import ProjectSettingsSidebar from "../../../Blocks/Requests/Settings/ProjectSettingsSidebar";
import NavigationBar from "../../NavigationBar";
import RequestNavigationDrawer from "../../Drawers/Requests/RequestNavigationDrawer";

export const RequestsSettingsRoute = ({component: Component, ...rest}) => {
  const token = localStorage.getItem('token');
  const project = localStorage.getItem('project');

  return (
    <React.Fragment>
      <NavigationBar drawer={RequestNavigationDrawer}/>
      <Container maxWidth={'xl'}>
        <ProjectSettingsSidebar/>
        <div>
          <Route
            {...rest}
            render={props =>
              token ? (
                <React.Fragment>
                  {project
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
