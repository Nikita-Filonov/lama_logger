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
import CustomRequests from "../../../../Screens/Requests/CustomRequests";
import RequestsTracks from "../../../../Screens/Requests/Tracks/RequestsTracks";
import IntegrationsSettings from "../../../../Screens/Requests/Settings/Integrations/IntegrationsSettings";
import RequestsFiltersSettings from "../../../../Screens/Requests/Settings/Requests/RequestsFiltersSettings";
import RequestsRealtimeSettings from "../../../../Screens/Requests/Settings/Requests/RequestsRealtimeSettings";
import {ServicesProvider} from "../../../../Providers/Requests/Tracks/ServicesProvider";
import {TracksProvider} from "../../../../Providers/Requests/Tracks/TracksProvider";
import TracksActivitiesSettings from "../../../../Screens/Requests/Settings/Tracks/TracksActivitiesSettings";
import NotificationsSettings from "../../../../Screens/Requests/Settings/Notifications/NotificationsSettings";
import ViewTrack from "../../../../Screens/Requests/Tracks/ViewTrack";
import PeriodicTasksSettings from "../../../../Screens/Requests/Settings/PeriodicTasksSettings";
import {ProjectTasksProvider} from "../../../../Providers/Requests/ProjectTasksProvider";
import TracksPatternsSettings from "../../../../Screens/Requests/Settings/Tracks/TracksPatternsSettings";
import {PermissionsProvider} from "../../../../Providers/Users/PermissionsProvider";
import TracksDomainsSettings from "../../../../Screens/Requests/Settings/Tracks/TracksDomainsSettings";
import {CustomRequestsProvider} from "../../../../Providers/Requests/CustomRequestsPorvider";

export const RequestsRoutes = ({store}) =>
  <RequestsProvider store={store}>
    <ServicesProvider store={store}>
      <ProjectSettingsProvider store={store}>
        <PermissionsProvider>
          <Switch>
            <RequestRoute exact path="/projects/:projectId/requests" component={Requests}/>
            <RequestRoute
              exact
              path="/projects/:projectId/requests/custom"
              component={props =>
                <CustomRequestsProvider store={store}>
                  <CustomRequests {...props}/>
                </CustomRequestsProvider>
              }
            />
            <RequestRoute
              exact
              path="/projects/:projectId/tracks"
              component={props =>
                <TracksProvider store={store}>
                  <RequestsTracks {...props}/>
                </TracksProvider>
              }
            />
            <RequestRoute
              exact
              path="/projects/:projectId/tracks/:trackId"
              component={props =>
                <TracksProvider store={store}>
                  <ViewTrack {...props}/>
                </TracksProvider>
              }
            />
            <RequestRoute
              exact
              path="/projects/:projectId/stats"
              component={props => <RequestsStatsProvider><RequestsStats {...props}/></RequestsStatsProvider>}
            />
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/general"
                                   component={ProjectSettingsGeneral}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/members"
                                   component={ProjectSettingsMembers}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/roles" component={ProjectSettingsRoles}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/inbound"
                                   component={RequestsInboundDataFilters}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/integrations"
                                   component={IntegrationsSettings}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/filters"
                                   component={RequestsFiltersSettings}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/realtime"
                                   component={RequestsRealtimeSettings}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/activities"
                                   component={TracksActivitiesSettings}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/patterns"
                                   component={TracksPatternsSettings}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/domains"
                                   component={TracksDomainsSettings}/>
            <RequestsSettingsRoute exact path="/projects/:projectId/settings/notifications"
                                   component={NotificationsSettings}/>
            <RequestsSettingsRoute
              exact
              path="/projects/:projectId/settings/tasks"
              component={props => <ProjectTasksProvider><PeriodicTasksSettings {...props}/></ProjectTasksProvider>}
            />
          </Switch>
        </PermissionsProvider>
      </ProjectSettingsProvider>
    </ServicesProvider>
  </RequestsProvider>
