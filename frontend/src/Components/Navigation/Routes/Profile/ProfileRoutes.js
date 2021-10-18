import React from "react";
import {Switch} from "react-router-dom";
import {ProfileRoute} from "./ProfileRoute";
import Profile from "../../../../Screens/Profile/Profile";
import {ApiTokens} from "../../../../Screens/Profile/ApiTokens";


export const ProfileRoutes = () =>
  <Switch>
    <ProfileRoute exact path="/user/profile" component={Profile}/>
    <ProfileRoute exact path="/user/tokens" component={ApiTokens}/>
  </Switch>
