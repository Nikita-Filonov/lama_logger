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
import {PublicRoute} from "./Components/Navigation/Routes/Common/PublicRoute";
import {ProjectsProvider} from "./Providers/ProjectsProvider";
import {RequestsProvider} from "./Providers/Requests/RequestsProvider";
import {AlertsProvider} from "./Providers/AlertsProvider";
import ConfirmAction from "./Components/Modals/Common/ConfirmAction";
import ThemeWrapper from "./Providers/ThemeWrapper";
import {LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import RequestsRoutes from "./Components/Navigation/Routes/Requests/RequestsRoutes";
import ProjectRoutes from "./Components/Navigation/Routes/Projects/ProjectRoutes";
import {SettingsProvider} from "./Providers/SettingsProvider";


const store = createStore(reducer);

const CustomRoute = () =>

  <Router>
    <div className={'d-flex'}>
      <Switch>
        {ProjectRoutes}
        {RequestsRoutes}
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
          <SettingsProvider>
            <AlertsProvider>
              <UsersProvider store={store}>
                <ProjectsProvider store={store}>
                  <RequestsProvider store={store}>
                    <CustomRoute/>
                  </RequestsProvider>
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
