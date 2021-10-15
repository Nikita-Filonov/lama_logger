import React from "react";
import {RequestRoute} from "./RequestRoute";
import Requests from "../../../../Screens/Requests/Requests";
import {RequestsStatsProvider} from "../../../../Providers/Requests/RequestsStatsProvider";
import RequestsStats from "../../../../Screens/Requests/RequestsStats";
import {RequestsSettingsRoute} from "./RequestsSettingsRoute";
import ProjectSettingsGeneral from "../../../../Screens/Requests/Settings/General/ProjectSettingsGeneral";
import ProjectSettingsMembers from "../../../../Screens/Requests/Settings/Users/ProjectSettingsMembers";
import ProjectSettingsRoles from "../../../../Screens/Requests/Settings/Users/ProjectSettingsRoles";
import RequestsInboundDataFilters from "../../../../Screens/Requests/Settings/Requests/RequestsInboundDataFilters";
import {RequestsSettingsProvider} from "../../../../Providers/Requests/RequestsSettingsProvider";

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
  <RequestsSettingsRoute
    exact path="/projects/:projectId/settings/inbound"
    component={props => <RequestsSettingsProvider><RequestsInboundDataFilters {...props}/></RequestsSettingsProvider>}
  />,
  <RequestsSettingsRoute exact path="/projects/:projectId/settings/integrations" component={ProjectSettingsRoles}/>
]
