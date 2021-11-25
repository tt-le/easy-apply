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
import PostJob from "./pages/PostJob"
import HistoryControl from "./pages/JobHistory";
import ResetPassword from "./pages/ResetPassword";

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
