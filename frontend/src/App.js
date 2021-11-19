import React from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";


import Dummy from './pages/Dummy'
import JobBoard from './pages/JobBoard'
import ApplyJob from "./pages/ApplyJob";

import SearchBar from './Components/SearchBar';

import SignUp from './pages/Signup';
import Login from './pages/Login';
import landingPage from "./pages/Landing";
import profilePage from "./pages/profilePage";
import ConfirmEmail from "./pages/ConfirmEmail";
import dashboard from "./pages/Dashboard"

function App() {
  return (
    <Switch>
        <Route path="/" exact component={landingPage} />
        <Route path="/signup" exact component={SignUp} />
        <Route path='/login' exact component={Login}/>
        <Route path="/JobBoard" exact component={SearchBar} />
        <Route path="/profile" exact component={profilePage}/>
        <Route path="/apply" component={ApplyJob}/>
        <Route path="/confirmEmail" component={ConfirmEmail}/>
        <Route path="/reset-password" component={ResetPassword}/>
        <Route path="/dashboard" exact component={dashboard}/>
    </Switch>
  );
}

export default App;
