import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/main.css'

import {Provider} from 'react-redux'
import {BrowserRouter as Router, Switch} from "react-router-dom";

import reducer from './Redux/Reducers';
import {createStore} from "redux";
import reportWebVitals from "./reportWebVitals";
import {Login} from "./Screens/Login/Login";
import {UsersProvider, useUsers} from "./Providers/UsersProvider";
import {Projects} from "./Screens/Projects/Projects";
import {NavigationBar} from "./Components/Navigation/Navbar";
import {PrivateRoute} from "./Components/Navigation/PrivateRoute";
import {PublicRoute} from "./Components/Navigation/PublicRoute";


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
        <CustomRoute/>
      </UsersProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
