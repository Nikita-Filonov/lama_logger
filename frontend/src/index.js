import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/main.css'

import {Provider} from 'react-redux'
import {BrowserRouter as Router, Switch} from "react-router-dom";

import reducer from './Redux/Reducers';
import {createStore} from "redux";
import {Login} from "./Screens/Login/Login";
import {UsersProvider, useUsers} from "./Providers/UsersProvider";
import Projects from "./Screens/Projects/Projects";
import {NavigationBar} from "./Components/Navigation/NavigationBar";
import {PrivateRoute} from "./Components/Navigation/PrivateRoute";
import {PublicRoute} from "./Components/Navigation/PublicRoute";
import {ProjectsProvider} from "./Providers/ProjectsProvider";
import Requests from "./Screens/Requests/Requests";
import {RequestsProvider} from "./Providers/RequestsProvider";
import {AlertsProvider} from "./Providers/AlertsProvider";


const store = createStore(reducer);

const CustomRoute = () => {
  const {token} = useUsers()

  return (
    <Router>
      <div>
        {token && <NavigationBar/>}
        <Switch>
          <PrivateRoute exact path="/projects" component={Projects}/>
          <PrivateRoute exact path="/projects/:projectId" component={Requests}/>
          <PublicRoute exact path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertsProvider>
        <UsersProvider>
          <ProjectsProvider store={store}>
            <RequestsProvider store={store}>
              <CustomRoute/>
            </RequestsProvider>
          </ProjectsProvider>
        </UsersProvider>
      </AlertsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
