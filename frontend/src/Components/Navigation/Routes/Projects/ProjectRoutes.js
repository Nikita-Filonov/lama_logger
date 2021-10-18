import Projects from "../../../../Screens/Projects/Projects";
import {ProjectRoute} from "./ProjectRoute";
import React from "react";
import {Switch} from "react-router-dom";


export const ProjectRoutes = () =>
  <Switch>
    <ProjectRoute exact path="/projects" component={Projects}/>
  </Switch>
