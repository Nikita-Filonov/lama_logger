import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {Container, Typography} from "@mui/material";
import clsx from "clsx";
import ProjectSettingsSidebar from "../../../Blocks/Projects/Settings/ProjectSettingsSidebar";
import {ViewRequestStyles} from "../../../../Styles/Blocks";

export const ProjectSettingsRoute = ({component: Component, ...rest}) => {
  const classes = ViewRequestStyles()
  const token = localStorage.getItem('token');
  const project = localStorage.getItem('project');

  return (
    <Container maxWidth={'xl'}>
      <div className={clsx('mt-3 d-flex justify-content-center align-items-center', classes.toolbarContainer)}>
        <Typography variant={'h6'}>Settings</Typography>
        <div className={'flex-grow-1'}/>
      </div>
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
  )
}
