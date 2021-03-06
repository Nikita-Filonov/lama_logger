import React from "react";
import {Switch} from "react-router-dom";
import CustomRequestsJsonEditorSettings
  from "../../../../Screens/Settings/CustomRequests/CustomRequestsJsonEditorSettings";
import {SettingsRoute} from "./SettingsRoute";
import CustomRequestsHeadersSettings from "../../../../Screens/Settings/CustomRequests/CustomRequestsHeadersSettings";
import ThemeSettings from "../../../../Screens/Settings/ThemeSettings";


export const SettingsRoutes = () =>
  <Switch>
    <SettingsRoute exact path="/settings/theme" component={ThemeSettings}/>
    <SettingsRoute exact path="/settings/json-editor" component={CustomRequestsJsonEditorSettings}/>
    <SettingsRoute exact path="/settings/headers" component={CustomRequestsHeadersSettings}/>
  </Switch>
