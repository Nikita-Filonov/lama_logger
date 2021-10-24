import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/main.css'
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
import {SettingsProvider} from "./Providers/SettingsProvider";
import {Registration} from "./Screens/Login/Registration";
import {ProfileRoutes} from "./Components/Navigation/Routes/Profile/ProfileRoutes";
import {IntegrationsRoutes} from "./Components/Navigation/Routes/Integrations/IntegrationsRoutes";


const store = createStore(reducer, applyMiddleware(thunk));

const CustomRoute = () =>
  <Router>
    <div className={'d-flex'}>
      <Switch>
        <PublicRoute exact path="/login" component={Login}/>
        <PublicRoute exact path="/registration" component={Registration}/>
      </Switch>
      <ProjectRoutes/>
      <ProfileRoutes/>
      <IntegrationsRoutes/>
      <RequestsRoutes store={store}/>
      <ConfirmAction/>
    </div>
  </Router>


ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <ThemeWrapper>
          <SettingsProvider>
            <AlertsProvider>
              <UsersProvider store={store}>
                <ProjectsProvider store={store}>
                  <CustomRoute/>
                </ProjectsProvider>
              </UsersProvider>
            </AlertsProvider>
          </SettingsProvider>
        </ThemeWrapper>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
