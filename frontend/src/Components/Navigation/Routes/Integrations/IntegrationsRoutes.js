import React from "react";
import {Switch} from "react-router-dom";
import {ProjectRoute} from "../Projects/ProjectRoute";
import {Integrations} from "../../../../Screens/Integrations/Integrations";


export const IntegrationsRoutes = () =>
  <Switch>
    <ProjectRoute exact path="/integrations" component={Integrations}/>
    <ProjectRoute exact path="/integrations/:language" component={Integrations}/>
  </Switch>
