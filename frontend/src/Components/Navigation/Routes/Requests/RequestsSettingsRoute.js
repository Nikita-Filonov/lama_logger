import React from 'react'
import {Container} from "@mui/material";
import ProjectSettingsSidebar from "../../../Blocks/Requests/Settings/ProjectSettingsSidebar";
import NavigationBar from "../../NavigationBar";
import RequestNavigationDrawer from "../../Drawers/Requests/RequestNavigationDrawer";
import {RequestRoute} from "./RequestRoute";

export const RequestsSettingsRoute = ({component: Component, ...rest}) => {

  return (
    <React.Fragment>
      <NavigationBar drawer={RequestNavigationDrawer}/>
      <Container maxWidth={'xl'}>
        <ProjectSettingsSidebar/>
        <div>
          <RequestRoute component={Component} {...rest}/>
        </div>
      </Container>
    </React.Fragment>
  )
}
