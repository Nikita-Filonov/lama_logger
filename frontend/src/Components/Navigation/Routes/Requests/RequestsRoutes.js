import {RequestRoute} from "./RequestRoute";
import Requests from "../../../../Screens/Requests/Requests";
import {RequestsStatsProvider} from "../../../../Providers/Requests/RequestsStatsProvider";
import RequestsStats from "../../../../Screens/Requests/RequestsStats";
import {RequestsSettingsRoute} from "./RequestsSettingsRoute";
import ProjectSettingsGeneral from "../../../../Screens/Projects/Settings/General/ProjectSettingsGeneral";
import ProjectSettingsMembers from "../../../../Screens/Projects/Settings/Users/ProjectSettingsMembers";
import ProjectSettingsRoles from "../../../../Screens/Projects/Settings/Users/ProjectSettingsRoles";
import React from "react";

export default [
  <RequestRoute exact path="/projects/:projectId/requests" component={Requests}/>,
  <RequestRoute
    exact
    path="/projects/:projectId/stats"
    component={props => <RequestsStatsProvider><RequestsStats {...props}/></RequestsStatsProvider>}
  />,
  <RequestsSettingsRoute exact path="/projects/:projectId/settings/general" component={ProjectSettingsGeneral}/>,
  <RequestsSettingsRoute exact path="/projects/:projectId/settings/members" component={ProjectSettingsMembers}/>,
  <RequestsSettingsRoute exact path="/projects/:projectId/settings/roles" component={ProjectSettingsRoles}/>,
  <RequestsSettingsRoute exact path="/projects/:projectId/settings/integrations" component={ProjectSettingsRoles}/>
]
