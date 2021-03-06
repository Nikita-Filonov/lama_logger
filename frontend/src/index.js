import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/main.css';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Switch} from "react-router-dom";
import reducer from './Redux/Reducers';
import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from "redux";
import {Login} from "./Screens/Login/Login";
import {UsersProvider} from "./Providers/Users/UsersProvider";
import {PublicRoute} from "./Components/Navigation/Routes/Common/PublicRoute";
import {ProjectsProvider} from "./Providers/ProjectsProvider";
import {AlertsProvider} from "./Providers/AlertsProvider";
import ConfirmAction from "./Components/Modals/Common/ConfirmAction";
import ThemeWrapper from "./Providers/ThemeWrapper";
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {RequestsRoutes} from "./Components/Navigation/Routes/Requests/RequestsRoutes";
import {ProjectRoutes} from "./Components/Navigation/Routes/Projects/ProjectRoutes";
import {UserSettingsProvider} from "./Providers/Users/UserSettingsProvider";
import {Registration} from "./Screens/Login/Registration";
import {ProfileRoutes} from "./Components/Navigation/Routes/Profile/ProfileRoutes";
import {IntegrationsRoutes} from "./Components/Navigation/Routes/Integrations/IntegrationsRoutes";
import {SettingsRoutes} from "./Components/Navigation/Routes/Settings/SettingsRoutes";


const store = createStore(reducer, applyMiddleware(thunk));

const CustomRoute = () =>
  <Router>
    <ProjectsProvider store={store}>
      <div className={'d-flex'}>
        <Switch>
          <PublicRoute exact path="/login" component={Login}/>
          <PublicRoute exact path="/registration" component={Registration}/>
        </Switch>
        <ProjectRoutes/>
        <ProfileRoutes/>
        <SettingsRoutes/>
        <IntegrationsRoutes/>
        <RequestsRoutes store={store}/>
        <ConfirmAction/>
      </div>
    </ProjectsProvider>
  </Router>


ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <ThemeWrapper>
          <AlertsProvider>
            <UsersProvider store={store}>
              <UserSettingsProvider store={store}>
                <CustomRoute/>
              </UserSettingsProvider>
            </UsersProvider>
          </AlertsProvider>
        </ThemeWrapper>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
