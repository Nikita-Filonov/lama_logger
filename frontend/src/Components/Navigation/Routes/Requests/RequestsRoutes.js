import React from "react";
import {Switch} from "react-router-dom";
import {RequestRoute} from "./RequestRoute";
import Requests from "../../../../Screens/Requests/Requests";
import {RequestsStatsProvider} from "../../../../Providers/Requests/RequestsStatsProvider";
import RequestsStats from "../../../../Screens/Requests/RequestsStats";
import {RequestsSettingsRoute} from "./RequestsSettingsRoute";
import ProjectSettingsGeneral from "../../../../Screens/Requests/Settings/General/ProjectSettingsGeneral";
import ProjectSettingsMembers from "../../../../Screens/Requests/Settings/Users/ProjectSettingsMembers";
import ProjectSettingsRoles from "../../../../Screens/Requests/Settings/Users/ProjectSettingsRoles";
import RequestsInboundDataFilters from "../../../../Screens/Requests/Settings/Requests/RequestsInboundDataFilters";
import {ProjectSettingsProvider} from "../../../../Providers/Requests/ProjectSettingsProvider";
import {RequestsProvider} from "../../../../Providers/Requests/RequestsProvider";
import {RequestsSend} from "../../../../Screens/Requests/RequestsSend";
import {RequestsTracks} from "../../../../Screens/Requests/RequestsTracks";
import {RequestsTracksProvider} from "../../../../Providers/Requests/RequestsTracksProvider";
import IntegrationsSettings from "../../../../Screens/Requests/Settings/Integrations/IntegrationsSettings";
import RequestsFiltersSettings from "../../../../Screens/Requests/Settings/Requests/RequestsFiltersSettings";

export const RequestsRoutes = ({store}) =>
  <RequestsProvider store={store}>
    <ProjectSettingsProvider store={store}>
      <Switch>
        <RequestRoute exact path="/projects/:projectId/requests" component={Requests}/>
        <RequestRoute exact path="/projects/:projectId/requests/send" component={RequestsSend}/>
        <RequestRoute
          exact
          path="/projects/:projectId/tracks"
          component={props => <RequestsTracksProvider store={store}>
            <RequestsTracks {...props}/><
            /RequestsTracksProvider>
          }
        />
        <RequestRoute
          exact
          path="/projects/:projectId/stats"
          component={props => <RequestsStatsProvider><RequestsStats {...props}/></RequestsStatsProvider>}
        />
        <RequestsSettingsRoute exact path="/projects/:projectId/settings/general" component={ProjectSettingsGeneral}/>
        <RequestsSettingsRoute exact path="/projects/:projectId/settings/members" component={ProjectSettingsMembers}/>
        <RequestsSettingsRoute exact path="/projects/:projectId/settings/roles" component={ProjectSettingsRoles}/>
        <RequestsSettingsRoute exact path="/projects/:projectId/settings/inbound"
                               component={RequestsInboundDataFilters}/>
        <RequestsSettingsRoute exact path="/projects/:projectId/settings/integrations"
                               component={IntegrationsSettings}/>
        <RequestsSettingsRoute exact path="/projects/:projectId/settings/filters" component={RequestsFiltersSettings}/>
      </Switch>
    </ProjectSettingsProvider>
  </RequestsProvider>
