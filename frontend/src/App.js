import React from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";


import Dummy from './Pages/Dummy'
import JobBoard from './Pages/JobBoard'
import ApplyJob from "./Pages/ApplyJob";

import SearchBar from './Components/SearchBar';

import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import landingPage from "./Pages/Landing";
import profilePage from "./Pages/profilePage";
import ConfirmEmail from "./Pages/ConfirmEmail";
import dashboard from "./Pages/Dashboard"
import PostJob from "./Pages/PostJob"
import HistoryControl from "./Pages/JobHistory";
import ResetPassword from "./Pages/ResetPassword";

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
        <Route path="/dashboard" exact component={dashboard}/>
        <Route path="/postJob" exact component={PostJob}/>
        <Route path="/jobHistory" exact component={HistoryControl}/>
        <Route path="/resetPassword" exact component={ResetPassword}/>
    </Switch>
  );
}

export default App;
