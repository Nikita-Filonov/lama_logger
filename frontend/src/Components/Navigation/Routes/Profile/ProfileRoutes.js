import React from "react";
import {Switch} from "react-router-dom";
import {ProfileRoute} from "./ProfileRoute";
import {Profile} from "../../../../Screens/Profile/Profile";


export const ProfileRoutes = () =>
  <Switch>
    <ProfileRoute exact path="/profile" component={Profile}/>
  </Switch>
