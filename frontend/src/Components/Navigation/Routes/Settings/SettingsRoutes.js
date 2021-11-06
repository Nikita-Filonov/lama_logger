import React from "react";
import {Switch} from "react-router-dom";
import {CustomRequestsJsonEditorSettings} from "../../../../Screens/Settings/CustomRequests/CustomRequestsJsonEditorSettings";
import {SettingsRoute} from "./SettingsRoute";


export const SettingsRoutes = () =>
  <Switch>
    <SettingsRoute exact path="/settings/theme" component={CustomRequestsJsonEditorSettings}/>
    <SettingsRoute exact path="/settings/json-editor" component={CustomRequestsJsonEditorSettings}/>
  </Switch>
