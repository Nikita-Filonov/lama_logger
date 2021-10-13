import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/main.css'

import {Provider} from 'react-redux'
import {BrowserRouter as Router, Switch} from "react-router-dom";

import reducer from './Redux/Reducers';
import {createStore} from "redux";
import {Login} from "./Screens/Login/Login";
import {UsersProvider} from "./Providers/UsersProvider";
import Projects from "./Screens/Projects/Projects";
import {PublicRoute} from "./Components/Navigation/Routes/Common/PublicRoute";
import {ProjectsProvider} from "./Providers/ProjectsProvider";
import Requests from "./Screens/Requests/Requests";
import {RequestsProvider} from "./Providers/RequestsProvider";
import {AlertsProvider} from "./Providers/AlertsProvider";
import ProjectSettingsGeneral from "./Screens/Projects/Settings/General/ProjectSettingsGeneral";
import {ProjectSettingsRoute} from "./Components/Navigation/Routes/Projects/ProjectSettingsRoute";
import ProjectSettingsMembers from "./Screens/Projects/Settings/Users/ProjectSettingsMembers";
import ProjectSettingsRoles from "./Screens/Projects/Settings/Users/ProjectSettingsRoles";
import ConfirmAction from "./Components/Modals/Common/ConfirmAction";
import ThemeWrapper from "./Providers/ThemeWrapper";
import {ProjectRoute} from "./Components/Navigation/Routes/Projects/ProjectRoute";
import {RequestRoute} from "./Components/Navigation/Routes/Requests/RequestRoute";
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Stats} from "./Screens/Requests/Stats";


const store = createStore(reducer);

const CustomRoute = () =>

  <Router>
    <div className={'d-flex'}>
      <Switch>
        <ProjectRoute exact path="/projects" component={Projects}/>
        <RequestRoute exact path="/projects/:projectId/requests" component={Requests}/>
        <RequestRoute exact path="/projects/:projectId/stats" component={Stats}/>
        <ProjectSettingsRoute exact path="/projects/:projectId/settings/general" component={ProjectSettingsGeneral}/>
        <ProjectSettingsRoute exact path="/projects/:projectId/settings/members" component={ProjectSettingsMembers}/>
        <ProjectSettingsRoute exact path="/projects/:projectId/settings/roles" component={ProjectSettingsRoles}/>
        <ProjectSettingsRoute exact path="/projects/:projectId/settings/integrations"
                              component={ProjectSettingsRoles}/>
        <PublicRoute exact path="/login" component={Login}/>
      </Switch>
      <ConfirmAction/>
    </div>
  </Router>

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <ThemeWrapper>
          <AlertsProvider>
            <UsersProvider store={store}>
              <ProjectsProvider store={store}>
                <RequestsProvider store={store}>
                  <CustomRoute/>
                </RequestsProvider>
              </ProjectsProvider>
            </UsersProvider>
          </AlertsProvider>
        </ThemeWrapper>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
