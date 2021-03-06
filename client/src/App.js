import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar/Navbar";
import Landing from "./components/layout/Landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Settings from "./components/settings/Settings";
import Footer from "./components/layout/Footer/Footer";


import "./App.css";
import Darkmode from 'darkmode-js';

const options = {
  bottom: '64px', 
  time: '0.5s', 
  mixColor: '#fff', 
  backgroundColor: '#fff', 
  buttonColorDark: '#100f2c',  
  buttonColorLight: '#fff', 
  saveInCookies: false, 
  label: '🌓', 
  autoMatchOsTheme: true 
}
const darkmode = new Darkmode(options);
darkmode.showWidget();
const Test = () => {
  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./login";
    }
  }
  

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <div className="container container-style">
          <Provider store={store}>
            <Test />
          </Provider>
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
