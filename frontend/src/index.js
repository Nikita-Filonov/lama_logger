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
import {Projects} from "./Screens/Projects/Projects";
import {NavigationBar} from "./Components/Navigation/Navbar";
import {PrivateRoute} from "./Components/Navigation/PrivateRoute";
import {PublicRoute} from "./Components/Navigation/PublicRoute";
import {ProjectsProvider} from "./Providers/ProjectsProvider";


const store = createStore(reducer);

const CustomRoute = () => {
  const {token} = useUsers()

  return (
    <Router>
      <div>
        {token && <NavigationBar/>}
        <Switch>
          <PrivateRoute exact path="/" component={Projects}/>
          <PublicRoute exact path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UsersProvider>
        <ProjectsProvider>
          <CustomRoute/>
        </ProjectsProvider>
      </UsersProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
